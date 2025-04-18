import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

export default function Interview() {
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    user: ''
  });

  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const currentMonth = "April 2025";
  
  const generateCalendarData = () => {
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
  
  const isToday = (day: number) => day === 18;
  const isWeekend = (dayIndex: number) => dayIndex === 5 || dayIndex === 6;
  
  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.description || !newEvent.user) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all fields to create an event",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Event Created",
      description: "Your event has been scheduled successfully"
    });
    
    setShowEventDialog(false);
    setNewEvent({ title: '', description: '', user: '' });
  };

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
            <Button 
              onClick={() => setShowEventDialog(true)}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>
        </div>
      </div>
      
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Input
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
            </div>
            
            <div>
              <Textarea
                placeholder="Event Description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                className="min-h-[100px]"
              />
            </div>
            
            <div>
              <Select
                value={newEvent.user}
                onValueChange={(value) => setNewEvent({ ...newEvent, user: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select User" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ayushthakur1412@gmail.com">
                    ayushthakur1412@gmail.com
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowEventDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleCreateEvent}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Create Event
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
