
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface Employee {
  name: string;
  role: string;
  fitment: string;
}

interface JobFitmentTableProps {
  jobRoles: string[];
  fitCategories: string[];
  employees: Employee[];
}

export default function JobFitmentTable({ jobRoles, fitCategories, employees }: JobFitmentTableProps) {
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedFitment, setSelectedFitment] = useState<string>("all");

  const filteredEmployees = employees.filter(employee => {
    const roleMatch = selectedRole === "all" || employee.role === selectedRole;
    const fitMatch = selectedFitment === "all" || employee.fitment === selectedFitment;
    return roleMatch && fitMatch;
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Job Fitment</h3>
        <div className="flex flex-col space-y-2">
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {jobRoles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedFitment} onValueChange={setSelectedFitment}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Fitment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {fitCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 rounded-tl-lg">Name</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Role</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 rounded-tr-lg">Fitment</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredEmployees.map((employee, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 border-t border-gray-100">{employee.name}</td>
                <td className="py-3 px-4 border-t border-gray-100">{employee.role}</td>
                <td className="py-3 px-4 border-t border-gray-100">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    employee.fitment === "Best Fit" ? "bg-green-100 text-green-800" :
                    employee.fitment === "Mid Fit" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {employee.fitment}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
