
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  CalendarDays, 
  Menu
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      path: "/users",
      icon: Users,
    },
    {
      name: "Jobs",
      path: "/jobs",
      icon: Briefcase,
    },
    {
      name: "Interview",
      path: "/interview",
      icon: CalendarDays,
    },
  ];
  
  return (
    <div className={cn(
      "bg-white border-r border-gray-200 h-screen flex flex-col",
      isCollapsed ? "w-16" : "w-56"
    )}>
      <div className={cn(
        "p-4 border-b border-gray-200 flex items-center",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        {!isCollapsed && (
          <div className="text-xl font-bold text-purple">people.ai</div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="p-1 rounded-md hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>
      </div>
      
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="px-3 py-4">
          {!isCollapsed && (
            <h2 className="mb-2 px-4 text-xs font-semibold text-gray-500 uppercase">
              Dashboard
            </h2>
          )}
          
          <nav className="space-y-1">
            {menuItems.slice(0, 1).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                  isActive(item.path)
                    ? "bg-purple/10 text-purple"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <item.icon size={20} className="mr-3" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="px-3 py-4">
          {!isCollapsed && (
            <h2 className="mb-2 px-4 text-xs font-semibold text-gray-500 uppercase">
              Utilities
            </h2>
          )}
          
          <nav className="space-y-1">
            {menuItems.slice(1).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                  isActive(item.path)
                    ? "bg-purple/10 text-purple"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <item.icon size={20} className="mr-3" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 text-center text-xs text-gray-500">
        v0.1.0
      </div>
    </div>
  );
}
