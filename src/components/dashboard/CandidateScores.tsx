
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import CandidateDetailsDialog from "./CandidateDetailsDialog";

interface Candidate {
  name: string;
  email: string;
  fitmentScore: number;
}

interface CandidateScoresProps {
  candidates: Candidate[];
}

export default function CandidateScores({ candidates }: CandidateScoresProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Candidate Fitment Scores</h3>
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
