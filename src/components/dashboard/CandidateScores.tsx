
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import CandidateDetailsDialog from "./CandidateDetailsDialog";
import { useToast } from "@/components/ui/use-toast";

interface Candidate {
  name: string;
  email: string;
  fitmentScore: number;
}

export default function CandidateScores() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('name, email, fitment_score')
          .order('fitment_score', { ascending: false })
          .limit(5);

        if (error) throw error;

        const formattedCandidates = data.map(user => ({
          name: user.name,
          email: user.email,
          fitmentScore: user.fitment_score || 0
        }));

        setCandidates(formattedCandidates);
      } catch (error) {
        toast({
          title: "Error fetching candidates",
          description: "Please try again later.",
          variant: "destructive",
        });
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();

    // Set up real-time subscription
    const channel = supabase
      .channel('public:users')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'users' 
        }, 
        () => {
          fetchCandidates();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Candidate Fitment Scores</h3>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/users" className="flex items-center gap-2">
            View All
            <ArrowRight size={16} />
          </Link>
        </Button>
      </div>
      
      <div className="space-y-4">
        {candidates.map((candidate) => (
          <div 
            key={candidate.email} 
            className="p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-colors cursor-pointer"
            onClick={() => setSelectedCandidate(candidate)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{candidate.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{candidate.email}</p>
              </div>
              <div className={`text-lg font-semibold ${
                candidate.fitmentScore >= 70 ? "text-green-600" :
                candidate.fitmentScore >= 50 ? "text-yellow-600" :
                "text-red-600"
              }`}>
                {candidate.fitmentScore.toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <CandidateDetailsDialog 
        isOpen={!!selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        candidate={selectedCandidate}
      />
    </div>
  );
}
