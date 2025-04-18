
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

export default function Interview() {
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const currentMonth = "April 2025";
  
  // Generate calendar data
  const generateCalendarData = () => {
    // For the sample, we'll create a fixed calendar matching the image
    const rows = [
      [{ day: 31, current: false }, ...Array(6).fill(0).map((_, i) => ({ day: i + 1, current: true }))],
      [...Array(7).fill(0).map((_, i) => ({ day: i + 7, current: true }))],
      [...Array(7).fill(0).map((_, i) => ({ day: i + 14, current: true }))],
      [...Array(7).fill(0).map((_, i) => ({ day: i + 21, current: true }))],
      [...Array(3).fill(0).map((_, i) => ({ day: i + 28, current: true })), ...Array(4).fill(0).map((_, i) => ({ day: i + 1, current: false }))]
    ];
    
    return rows;
  };
  
  const calendarData = generateCalendarData();
  
  const isToday = (day: number) => day === 18; // Hardcoded for the example
  const isWeekend = (dayIndex: number) => dayIndex === 5 || dayIndex === 6;
  
  return (
    <div className="page-container">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden max-w-lg mx-auto">
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold">Event Calendar</h1>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <button className="p-1 hover:bg-gray-100 rounded">
              <span className="sr-only">Previous month</span>
              &lt;
            </button>
            
            <h2 className="text-lg font-medium">{currentMonth}</h2>
            
            <button className="p-1 hover:bg-gray-100 rounded">
              <span className="sr-only">Next month</span>
              &gt;
            </button>
          </div>
          
          <div className="grid grid-cols-7 text-center mb-2">
            {days.map((day) => (
              <div key={day} className="text-xs font-medium text-gray-500 py-1">
                {day}
              </div>
            ))}
          </div>
          
          <div className="border rounded-md">
            {calendarData.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 text-center">
                {week.map((date, dayIndex) => (
                  <div 
                    key={`${weekIndex}-${dayIndex}`} 
                    className={`
                      py-2 border-t first:border-t-0 border-r last:border-r-0
                      ${!date.current ? 'text-gray-400' : ''}
                      ${isToday(date.day) ? 'bg-blue-500 text-white' : ''}
                      ${isWeekend(dayIndex) && !isToday(date.day) && date.current ? 'text-red-500' : ''}
                    `}
                  >
                    {date.day}
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <Button className="bg-blue-500 hover:bg-blue-600">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
