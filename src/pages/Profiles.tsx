
import { useApiData } from "@/hooks/useApiData";
import { profileService, ProfileFilters, Profile } from "@/services/profileService";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/hooks/use-language";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Profiles = () => {
  const { currentLang } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('created_at_desc');
  
  const {
    data,
    loading,
    error,
    pagination,
    updatePagination,
    updateFilters,
    updateSort,
  } = useApiData<Profile>({
    fetchFunction: profileService.getList.bind(profileService),
    initialPagination: { page: 1, limit: 12 },
  });

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    updateFilters({ full_name: value.trim() || undefined });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    updateSort(value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        <p>Ошибка загрузки данных: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#D3E4E0]/50 backdrop-blur-sm">
      <BackButton />
      <main className="flex-grow pt-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-light text-tea-text mb-8 text-center">
            Профили пользователей
          </h1>
          
          <div className="space-y-6">
            {/* Фильтры и поиск */}
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex-1">
                <Input
                  placeholder="Поиск по имени..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Сортировка" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="created_at_desc">Новые первыми</SelectItem>
                    <SelectItem value="created_at_asc">Старые первыми</SelectItem>
                    <SelectItem value="full_name_asc">По имени А-Я</SelectItem>
                    <SelectItem value="full_name_desc">По имени Я-А</SelectItem>
                    <SelectItem value="email_asc">По email А-Я</SelectItem>
                    <SelectItem value="updated_at_desc">Недавно обновленные</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Список профилей */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((profile) => (
                <Card key={profile.id} className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {profile.full_name || 'Без имени'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">{profile.email || 'Без email'}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {new Date(profile.created_at!).toLocaleDateString('ru-RU')}
                      </span>
                      <Button size="sm">Подробнее</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Пагинация */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 py-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updatePagination({ page: pagination.page - 1 })}
                  disabled={!pagination.hasPrev}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Предыдущая
                </Button>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    Страница {pagination.page} из {pagination.totalPages}
                  </span>
                  <span className="text-xs text-gray-500">
                    (всего {pagination.total} записей)
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updatePagination({ page: pagination.page + 1 })}
                  disabled={!pagination.hasNext}
                >
                  Следующая
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profiles;
