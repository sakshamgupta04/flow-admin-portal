import { useNavigate } from "react-router-dom";
import { BarChart2, Briefcase, Calendar, Users, FileText, ArrowRight } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const vacancyData = [
  { name: "Jan", value: 12 },
  { name: "Feb", value: 19 },
  { name: "Mar", value: 15 },
  { name: "Apr", value: 23 },
  { name: "May", value: 18 },
  { name: "Jun", value: 15 },
  { name: "Jul", value: 20 },
  { name: "Aug", value: 25 },
  { name: "Sep", value: 15 },
  { name: "Oct", value: 10 },
  { name: "Nov", value: 15 },
  { name: "Dec", value: 20 },
];

const candidates = [
  { name: "Saksham Gupta", email: "2022a6041@mietjammu.in", fitmentScore: 65.5 },
  { name: "Ayush Thakur", email: "ayushthakur1412@gmail.com", fitmentScore: 69.94 },
  { name: "Adishwar Sharma", email: "2021a1045@mietjammu.in", fitmentScore: 72.58 },
  { name: "Garima Saigal", email: "garimasaigal02@gmail.com", fitmentScore: 55.32 },
  { name: "Aarush Wali", email: "2022A6002@mietjammu.in", fitmentScore: 62.45 }
];

const jobRoles = [
  "Professor",
  "Assistant Professor",
  "Associate Professor",
  "Head of Department",
  "Dean",
  "Research Associate",
  "Lab Assistant",
  "Academic Coordinator"
];

const fitCategories = ["Best Fit", "Mid Fit", "Not Fit"];

const mockEmployeeData = [
  { name: "Joseph Smith", role: "Professor", fitment: "Best Fit" },
  { name: "Saksham Gupta", role: "Assistant Professor", fitment: "Best Fit" },
  { name: "Aarush Wali", role: "Associate Professor", fitment: "Mid Fit" },
  { name: "Iso Kumar", role: "Professor", fitment: "Not Fit" },
  { name: "Yoru Singh", role: "Dean", fitment: "Mid Fit" },
  { name: "Reyna Patel", role: "Research Associate", fitment: "Best Fit" },
  { name: "Garima Saigal", role: "Lab Assistant", fitment: "Mid Fit" },
  { name: "Raghav Sharma", role: "Academic Coordinator", fitment: "Best Fit" }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedFitment, setSelectedFitment] = useState<string>("all");

  const filteredEmployees = mockEmployeeData.filter(employee => {
    const roleMatch = selectedRole === "all" || employee.role === selectedRole;
    const fitMatch = selectedFitment === "all" || employee.fitment === selectedFitment;
    return roleMatch && fitMatch;
  });

  const handleViewCandidate = (email: string) => {
    const candidate = candidates.find(c => c.email === email);
    if (candidate) {
      navigate('/users', { state: { selectedUser: candidate } });
    }
  };

  return (
    <div className="page-container dark:bg-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          value="9"
          title="Total Users"
          icon={<Users size={24} className="text-white" />}
          color="purple"
        />
        
        <StatCard 
          value="15"
          title="Job Vacancies"
          icon={<Briefcase size={24} className="text-white" />}
          color="blue"
          className="relative overflow-hidden"
        >
          <div className="absolute bottom-0 right-0 w-full h-20 pointer-events-none">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vacancyData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#fff" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </StatCard>
        
        <StatCard 
          value="150"
          title="Resumes for Review"
          icon={<FileText size={24} className="text-blue" />}
        />
        
        <StatCard 
          value="5"
          title="Scheduled Interviews For Today"
          icon={<Calendar size={24} className="text-blue" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Candidate Fitment Scores</h3>
          </div>
          
          <div className="space-y-4">
            {candidates.map((candidate) => (
              <div 
                key={candidate.email} 
                className="p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-colors cursor-pointer"
                onClick={() => handleViewCandidate(candidate.email)}
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
          
          <div className="mt-4 flex justify-end">
            <Button 
              variant="link" 
              className="text-blue-500 font-medium flex items-center"
              onClick={() => navigate('/users')}
            >
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
