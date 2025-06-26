
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Upload, Loader2 } from "lucide-react";

interface AvatarUploadProps {
  userId: string;
  currentAvatarUrl?: string;
  onAvatarUpdate: (url: string) => void;
  initials?: string;
}

export const AvatarUpload = ({ userId, currentAvatarUrl, onAvatarUpdate, initials }: AvatarUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Вы должны выбрать изображение для загрузки.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}/avatar.${fileExt}`;

      // Удаляем старый аватар, если он есть
      if (currentAvatarUrl) {
        const oldPath = currentAvatarUrl.split('/').pop();
        if (oldPath) {
          await supabase.storage.from('avatars').remove([`${userId}/${oldPath}`]);
        }
      }

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      // Получаем публичный URL
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      
      // Обновляем профиль в базе данных
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: data.publicUrl })
        .eq('id', userId);

      if (updateError) {
        throw updateError;
      }

      onAvatarUpdate(data.publicUrl);
      toast({
        title: "Успешно!",
        description: "Аватар обновлен",
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Ошибка загрузки аватара",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="w-24 h-24">
        <AvatarImage src={currentAvatarUrl} />
        <AvatarFallback className="text-lg">
          {initials || "?"}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex items-center space-x-2">
        <Input
          type="file"
          id="avatar-upload"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => document.getElementById('avatar-upload')?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Upload className="w-4 h-4 mr-2" />
          )}
          {uploading ? "Загрузка..." : "Изменить фото"}
        </Button>
      </div>
    </div>
  );
};
