
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { useUsers, type UserProfile } from "@/hooks/useUsers";
import UsersTable from "@/components/users/UsersTable";
import UserDetailsDialog from "@/components/users/UserDetailsDialog";

export default function Users() {
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const { users, isLoading, fetchUsers } = useUsers();

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
