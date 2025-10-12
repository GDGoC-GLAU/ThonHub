import { Calendar } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

const CalendarView = () => {
  const events = [
    { date: "Dec 15", title: "AI Innovation Challenge", type: "hackathon" },
    { date: "Dec 17", title: "Submission Deadline", type: "deadline" },
    { date: "Jan 10", title: "Climate Tech Hackathon", type: "hackathon" },
    { date: "Jan 20", title: "FinTech Revolution", type: "hackathon" },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-bold">Upcoming Events</h3>
      </div>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="text-center min-w-[60px]">
              <div className="text-sm font-bold">{event.date.split(" ")[0]}</div>
              <div className="text-xs text-muted-foreground">{event.date.split(" ")[1]}</div>
            </div>
            <div className="flex-1">
              <p className="font-medium">{event.title}</p>
              <Badge variant="secondary" className="mt-1 text-xs">
                {event.type}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CalendarView;
