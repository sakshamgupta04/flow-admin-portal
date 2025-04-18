import { BarChart2, Briefcase, Calendar, Users, FileText } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import JobsChart from "@/components/dashboard/JobsChart";
import AnalyticsCard from "@/components/dashboard/AnalyticsCard";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  { 
    name: "Joseph", 
    title: "Top Scorer", 
    score: 98.95, 
    trend: [20, 25, 45, 30, 50, 60, 40, 80, 60, 70] 
  },
  { 
    name: "Saksham Gupta", 
    title: "", 
    score: 90.15, 
    trend: [40, 30, 50, 60, 45, 70, 60, 80, 75, 65] 
  },
  { 
    name: "Aarush Wali", 
    title: "", 
    score: 80.02, 
    trend: [30, 50, 40, 60, 50, 70, 60, 55, 65, 70] 
  },
  { 
    name: "Iso", 
    title: "", 
    score: 71.25, 
    trend: [20, 40, 30, 50, 45, 55, 50, 60, 50, 45] 
  },
  { 
    name: "Yoru", 
    title: "", 
    score: 45.39, 
    trend: [10, 20, 30, 40, 35, 45, 40, 50, 45, 35] 
  },
  { 
    name: "Reyna", 
    title: "", 
    score: 78.64, 
    trend: [30, 45, 40, 60, 50, 65, 60, 70, 65, 75] 
  },
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
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedFitment, setSelectedFitment] = useState<string>("all");

  const filteredEmployees = mockEmployeeData.filter(employee => {
    const roleMatch = selectedRole === "all" || employee.role === selectedRole;
    const fitMatch = selectedFitment === "all" || employee.fitment === selectedFitment;
    return roleMatch && fitMatch;
  });

  return (
    <div className="page-container">
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
      
      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Hiring Ratio</h3>
          <div className="flex space-x-4">
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-[200px]">
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
              <SelectTrigger className="w-[200px]">
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
        
        <div className="h-72">
          <JobsChart />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Fitment</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-3 px-4">{employee.name}</td>
                    <td className="py-3 px-4">{employee.role}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
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
        
        <div>
          <AnalyticsCard candidates={candidates} />
        </div>
      </div>
    </div>
  );
}
