
import { supabase } from '@/integrations/supabase/client';

export interface ProfileCompletionStatus {
  is_profile_complete: boolean;
  referrals_count: number;
  total_purchases: number;
  missing_for_pearl: {
    profile_complete: boolean;
    need_referrals: number;
  };
}

export const loyaltyService = {
  async getProfileCompletionStatus(userId: string): Promise<ProfileCompletionStatus | null> {
    try {
      const { data, error } = await supabase.rpc('get_profile_completion_status', {
        user_uuid: userId
      });

      if (error) {
        console.error('Error getting profile completion status:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error getting profile completion status:', error);
      return null;
    }
  },

  async getReferralsCount(userId: string): Promise<number> {
    try {
      const { data, error } = await supabase
        .from('referrals')
        .select('*', { count: 'exact' })
        .eq('referrer_id', userId)
        .eq('is_completed', true);

      if (error) {
        console.error('Error getting referrals count:', error);
        return 0;
      }

      return data?.length || 0;
    } catch (error) {
      console.error('Error getting referrals count:', error);
      return 0;
    }
  }
};
