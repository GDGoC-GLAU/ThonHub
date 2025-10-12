import { Plus, Users, Calendar, Award, TrendingUp } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import OrgDashboard from "../components/OrgDashboard";

const OrgPanel = () => {
  const stats = [
    {
      title: "Total Participants",
      value: "2,847",
      change: "+12.5%",
      icon: <Users className="h-5 w-5" />,
      color: "text-primary",
    },
    {
      title: "Active Hackathons",
      value: "5",
      change: "+2",
      icon: <Calendar className="h-5 w-5" />,
      color: "text-secondary",
    },
    {
      title: "Total Submissions",
      value: "342",
      change: "+18.2%",
      icon: <Award className="h-5 w-5" />,
      color: "text-accent",
    },
    {
      title: "Success Rate",
      value: "94%",
      change: "+3.1%",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-primary",
    },
  ];

  const activeHackathons = [
    {
      title: "AI Innovation Challenge 2024",
      status: "Live",
      participants: 1250,
      submissions: 145,
      endDate: "Dec 17, 2024",
    },
    {
      title: "Climate Tech Hackathon",
      status: "Registration",
      participants: 890,
      submissions: 0,
      endDate: "Jan 12, 2025",
    },
    {
      title: "FinTech Revolution",
      status: "Planning",
      participants: 0,
      submissions: 0,
      endDate: "Jan 22, 2025",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Organization Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your hackathons and track performance
            </p>
          </div>
          <Button size="lg" className="bg-gradient-primary">
            <Plus className="mr-2 h-5 w-5" />
            Create Hackathon
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-primary/10 ${stat.color}`}>
                  {stat.icon}
                </div>
                <Badge variant="secondary" className="text-xs">
                  {stat.change}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Active Hackathons */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Active Hackathons</h2>
          <div className="grid gap-6">
            {activeHackathons.map((hackathon) => (
              <Card key={hackathon.title} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{hackathon.title}</h3>
                    <Badge
                      variant={
                        hackathon.status === "Live"
                          ? "default"
                          : hackathon.status === "Registration"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {hackathon.status}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Participants</p>
                    <p className="text-2xl font-bold">{hackathon.participants}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Submissions</p>
                    <p className="text-2xl font-bold">{hackathon.submissions}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ends</p>
                    <p className="text-sm font-medium">{hackathon.endDate}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Dashboard Component */}
        <OrgDashboard />
      </div>
    </div>
  );
};

export default OrgPanel;
