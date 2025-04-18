
import { useState } from "react";
import { Briefcase, Calendar, Users, FileText } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import VacancyStats from "@/components/dashboard/VacancyStats";
import JobFitmentTable from "@/components/dashboard/JobFitmentTable";
import CandidateScores from "@/components/dashboard/CandidateScores";
import InterviewScheduleDialog from "@/components/dashboard/InterviewScheduleDialog";

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
  const [showInterviews, setShowInterviews] = useState(false);

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
          <VacancyStats data={vacancyData} />
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
          onClick={() => setShowInterviews(true)}
          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <JobFitmentTable 
          jobRoles={jobRoles}
          fitCategories={fitCategories}
          employees={mockEmployeeData}
        />

        <CandidateScores />
      </div>

      <InterviewScheduleDialog 
        isOpen={showInterviews}
        onClose={() => setShowInterviews(false)}
      />
    </div>
  );
}
