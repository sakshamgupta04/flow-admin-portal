import { Button } from "@/components/ui/button";
import { RefreshCw, ChevronLeft } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  score: number;
  jobRole?: string;
  experience?: string;
  education?: string;
  about?: string;
  personalityScores?: {
    extroversion: number;
    agreeableness: number;
    openness: number;
    neuroticism: number;
    conscientiousness: number;
  };
}

export default function Users() {
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchUsers = async () => {
    setIsLoading(true);
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

      setUsers(formattedUsers);
    } catch (error) {
      toast({
        title: "Error fetching users",
        description: "Please try again later.",
        variant: "destructive",
      });
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className={
                    user.score >= 70 ? "text-green-500" : 
                    user.score >= 50 ? "text-orange-500" : 
                    "text-red-500"
                  }>
                    {user.score.toFixed(2)}%
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="bg-blue-500 hover:bg-blue-600"
                        onClick={() => setSelectedUser(user)}
                      >
                        View
                      </Button>
                      <Button size="sm" variant="destructive">Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSelectedUser(null)}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span>Candidate Profile</span>
            </DialogTitle>
          </DialogHeader>
          
          {selectedUser && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="aspect-square w-full max-w-[300px] mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">Profile Image</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                    <p className="text-gray-500">{selectedUser.email}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Job Role:</h4>
                    <p>{selectedUser.jobRole}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Experience:</h4>
                    <p>{selectedUser.experience}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Education:</h4>
                    <p>{selectedUser.education}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">About Me:</h4>
                    <p className="text-gray-600">{selectedUser.about}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">AI Generated Fitment Score</h3>
                  <div className="text-center p-4 border rounded-lg">
                    <Progress value={selectedUser.score} className="h-2 mb-2" />
                    <div className="text-3xl font-bold text-blue-600">
                      {selectedUser.score.toFixed(2)}%
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Personality Assessment</h4>
                  {selectedUser.personalityScores && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Extroversion Score</span>
                          <span>{selectedUser.personalityScores.extroversion}%</span>
                        </div>
                        <Progress value={selectedUser.personalityScores.extroversion} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Agreeableness Score</span>
                          <span>{selectedUser.personalityScores.agreeableness}%</span>
                        </div>
                        <Progress value={selectedUser.personalityScores.agreeableness} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Openness Score</span>
                          <span>{selectedUser.personalityScores.openness}%</span>
                        </div>
                        <Progress value={selectedUser.personalityScores.openness} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Neuroticism Score</span>
                          <span>{selectedUser.personalityScores.neuroticism}%</span>
                        </div>
                        <Progress value={selectedUser.personalityScores.neuroticism} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Conscientiousness Score</span>
                          <span>{selectedUser.personalityScores.conscientiousness}%</span>
                        </div>
                        <Progress value={selectedUser.personalityScores.conscientiousness} className="h-2" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
