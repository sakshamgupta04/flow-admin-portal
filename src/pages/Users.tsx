
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface User {
  id: string;
  name: string;
  email: string;
  score: number;
}

const users: User[] = [
  { id: "1", name: "Saksham Gupta", email: "2022a6041@mietjammu.in", score: 0 },
  { id: "2", name: "Ayush Thakur", email: "ayushthakur1412@gmail.com", score: 69.94 },
  { id: "3", name: "Raghav Sharma", email: "raghavsharma@gmail.com", score: 0 },
  { id: "4", name: "Raghav Sharma", email: "raghavsharma301103@gmail.com", score: 36.26 },
  { id: "5", name: "Saksham Gupta", email: "try.saksham@gmail.com", score: 0 },
  { id: "6", name: "Aarush Wali", email: "2022A6002@mietjammu.in", score: 0 },
  { id: "7", name: "Adishwar Sharma", email: "2021a1045@mietjammu.in", score: 89.58 },
  { id: "8", name: "Raghav Sharma", email: "abc@gmail.com", score: 0 },
  { id: "9", name: "Garima Saigal", email: "garimasaigal02@gmail.com", score: 0 },
];

export default function Users() {
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
                  <TableCell className={user.score > 0 ? (user.score > 70 ? "text-green-500" : "text-orange-500") : "text-red-500"}>
                    {user.score > 0 ? `${user.score.toFixed(2)}%` : "0%"}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600">View</Button>
                      <Button size="sm" variant="destructive">Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="p-4 flex items-center justify-center space-x-4">
          <Button variant="outline" size="icon" disabled>
            &lt;
          </Button>
          <span className="px-3 py-1 bg-gray-100 rounded">1</span>
          <Button variant="outline" size="icon" disabled>
            &gt;
          </Button>
        </div>
      </div>
    </div>
  );
}
