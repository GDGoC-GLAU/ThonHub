import { TrendingUp, Users, Award, Calendar } from "lucide-react";
import { Card } from "./ui/card";

const OrgDashboard = () => {
  const quickActions = [
    {
      title: "Create Event",
      icon: <Calendar className="h-6 w-6" />,
      color: "bg-primary/10 text-primary",
      description: "Start a new hackathon",
    },
    {
      title: "View Analytics",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "bg-secondary/10 text-secondary",
      description: "Track performance",
    },
    {
      title: "Manage Teams",
      icon: <Users className="h-6 w-6" />,
      color: "bg-accent/10 text-accent",
      description: "View participants",
    },
    {
      title: "Awards",
      icon: <Award className="h-6 w-6" />,
      color: "bg-primary/10 text-primary",
      description: "Distribute prizes",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Card
            key={action.title}
            className="p-6 cursor-pointer hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
          >
            <div
              className={`p-3 rounded-xl w-fit mb-4 ${action.color}`}
            >
              {action.icon}
            </div>
            <h3 className="font-bold mb-1">{action.title}</h3>
            <p className="text-sm text-muted-foreground">{action.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrgDashboard;
