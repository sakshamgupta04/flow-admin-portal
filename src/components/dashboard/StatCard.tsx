
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string | number;
  title: string;
  icon?: ReactNode;
  color?: "purple" | "blue" | "white";
  className?: string;
  children?: ReactNode;
}

export default function StatCard({ 
  value, 
  title, 
  icon, 
  color = "white",
  className,
  children
}: StatCardProps) {
  return (
    <div className={cn(
      "stat-card flex items-start justify-between p-6 relative",
      color === "purple" && "card-purple",
      color === "blue" && "card-blue",
      className
    )}>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-title">{title}</div>
      </div>
      {icon && (
        <div className="p-3 rounded-full bg-white/10">
          {icon}
        </div>
      )}
      {children}
    </div>
  );
}
