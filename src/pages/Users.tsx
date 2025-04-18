
import { Button } from "@/components/ui/button";
import { RefreshCw, ChevronLeft } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

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

const users: UserProfile[] = [
  { 
    id: "1", 
    name: "Saksham Gupta", 
    email: "2022a6041@mietjammu.in", 
    score: 65.5,
    jobRole: "Assistant Professor",
    experience: "3+ Years",
    education: "Ph.D. in Computer Science",
    about: "Experienced educator with a focus on AI and machine learning",
    personalityScores: {
      extroversion: 75,
      agreeableness: 82,
      openness: 88,
      neuroticism: 45,
      conscientiousness: 79
    }
  },
  { 
    id: "2", 
    name: "Ayush Thakur", 
    email: "ayushthakur1412@gmail.com", 
    score: 69.94,
    jobRole: "Professor",
    experience: "6+ Years",
    education: "Master of Computer Science",
    about: "Self experienced Front End Developer with a strong background in software and web development",
    personalityScores: {
      extroversion: 68,
      agreeableness: 72,
      openness: 85,
      neuroticism: 42,
      conscientiousness: 81
    }
  },
  // ... Add similar detailed profiles for other users with scores between 40-80%
];

export default function Users() {
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  return (
    <div className="page-container">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b">
          <h1 className="text-xl font-semibold">User List</h1>
          <Button size="icon" variant="outline">
            <RefreshCw size={16} />
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
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                  <p className="text-gray-500">{selectedUser.email}</p>
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

                <Button className="w-full">View Resume</Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">AI Generated Fitment Score</h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {selectedUser.score.toFixed(2)}%
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Personality Scores</h4>
                  {selectedUser.personalityScores && Object.entries(selectedUser.personalityScores).map(([trait, score]) => (
                    <div key={trait} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{trait} Score</span>
                        <span>{score}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
