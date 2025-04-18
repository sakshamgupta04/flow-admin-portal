
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { UserProfile } from "@/hooks/useUsers";

interface UsersTableProps {
  users: UserProfile[];
  onViewUser: (user: UserProfile) => void;
}

export default function UsersTable({ users, onViewUser }: UsersTableProps) {
  return (
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
                  onClick={() => onViewUser(user)}
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
  );
}
