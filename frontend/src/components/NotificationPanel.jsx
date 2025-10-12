import { Bell, Check, X } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";

const NotificationPanel = () => {
  const notifications = [
    {
      id: 1,
      type: "hackathon",
      title: "New Hackathon Alert",
      message: "AI Innovation Challenge registration is now open!",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "team",
      title: "Team Invitation",
      message: "Sarah Kim invited you to join their team",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "submission",
      title: "Submission Reminder",
      message: "Climate Tech Hackathon deadline in 2 days",
      time: "1 day ago",
      read: true,
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold">Notifications</h3>
          <Badge variant="secondary">{notifications.filter(n => !n.read).length}</Badge>
        </div>
        <Button variant="ghost" size="sm">
          <Check className="h-4 w-4 mr-2" />
          Mark all read
        </Button>
      </div>

      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border transition-colors ${
                !notification.read
                  ? "bg-primary/5 border-primary/20"
                  : "border-border"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{notification.title}</p>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default NotificationPanel;
