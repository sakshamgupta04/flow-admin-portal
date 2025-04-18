
import { BarChart2, Briefcase, Calendar, Users, FileText } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import JobsChart from "@/components/dashboard/JobsChart";
import AnalyticsCard from "@/components/dashboard/AnalyticsCard";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";

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

export default function Dashboard() {
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <JobsChart />
        </div>
        
        <div>
          <AnalyticsCard candidates={candidates} />
        </div>
      </div>
    </div>
  );
}
