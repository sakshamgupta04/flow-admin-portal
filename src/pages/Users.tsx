
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import UsersTable from "@/components/users/UsersTable";
import UserDetailsDialog from "@/components/users/UserDetailsDialog";
import type { UserProfile } from "@/hooks/useUsers";

export default function Users() {
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const { toast } = useToast();
  
  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const { data: usersData, error: usersError } = await supabase
          .from('users')
          .select(`
            id,
            name,
            email,
            job_role,
            experience,
            education,
            about,
            fitment_score
          `);

        if (usersError) throw usersError;

        const formattedUsers: UserProfile[] = await Promise.all(
          (usersData || []).map(async (user) => {
            const { data: personalityData } = await supabase
              .from('user_personality_scores')
              .select('*')
              .eq('user_id', user.id)
              .single();

            return {
              id: user.id,
              name: user.name,
              email: user.email,
              score: user.fitment_score || 0,
              jobRole: user.job_role,
              experience: user.experience,
              education: user.education,
              about: user.about,
              personalityScores: personalityData ? {
                extroversion: personalityData.extroversion,
                agreeableness: personalityData.agreeableness,
                openness: personalityData.openness,
                neuroticism: personalityData.neuroticism,
                conscientiousness: personalityData.conscientiousness,
              } : undefined
            };
          })
        );

        return formattedUsers;
      } catch (error) {
        toast({
          title: "Error fetching users",
          description: "Please try again later.",
          variant: "destructive",
        });
        console.error('Error fetching users:', error);
        return [];
      }
    }
  });

  const fetchUsers = () => {
    refetch();
  };

  return (
    <div className="page-container">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b">
          <h1 className="text-xl font-semibold">User List</h1>
          <Button 
            size="icon" 
            variant="outline" 
            onClick={fetchUsers}
            disabled={isLoading}
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <UsersTable 
            users={users} 
            onViewUser={setSelectedUser} 
          />
        </div>
      </div>

      <UserDetailsDialog 
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        user={selectedUser}
      />
    </div>
  );
}
