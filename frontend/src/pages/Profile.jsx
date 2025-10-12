import { useState } from "react";
import { Github, Linkedin, Mail, MapPin, Calendar, Award, Code, Edit } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import ProfileCard from "../components/ProfileCard";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const userData = {
    name: "Alex Chen",
    username: "@alexchen",
    role: "Full Stack Developer",
    bio: "Passionate about building innovative solutions. Love working with React, Node.js, and AI/ML technologies.",
    location: "San Francisco, CA",
    email: "alex.chen@email.com",
    github: "alexchen",
    linkedin: "alexchen",
    joinDate: "Jan 2023",
    avatar: "AC",
  };

  const skills = [
    "React", "Node.js", "Python", "TypeScript", "AWS",
    "Docker", "PostgreSQL", "MongoDB", "TensorFlow", "Git"
  ];

  const badges = [
    { name: "First Hackathon", icon: "🎯", color: "bg-primary/10" },
    { name: "Team Player", icon: "🤝", color: "bg-secondary/10" },
    { name: "AI Expert", icon: "🤖", color: "bg-accent/10" },
    { name: "Winner", icon: "🏆", color: "bg-primary/10" },
  ];

  const hackathons = [
    {
      name: "AI Innovation Challenge 2024",
      role: "Team Lead",
      date: "Dec 2024",
      result: "1st Place",
      prize: "$10,000",
    },
    {
      name: "Climate Tech Hackathon",
      role: "Frontend Developer",
      date: "Nov 2024",
      result: "2nd Place",
      prize: "$5,000",
    },
    {
      name: "FinTech Revolution",
      role: "Full Stack Developer",
      date: "Oct 2024",
      result: "Participant",
      prize: "-",
    },
  ];

  const stats = [
    { value: "12", label: "Hackathons" },
    { value: "5", label: "Wins" },
    { value: "8", label: "Teams" },
    { value: "98%", label: "Success Rate" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <ProfileCard user={userData} />
            
            {/* Quick Stats */}
            <Card className="p-6 mt-6">
              <h3 className="font-bold mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Actions */}
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
                <TabsTrigger value="badges">Badges</TabsTrigger>
              </TabsList>

              {/* About Tab */}
              <TabsContent value="about" className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4">Bio</h3>
                  <p className="text-muted-foreground">{userData.bio}</p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4">AI Resume Analysis</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Code className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Technical Strength</p>
                        <p className="text-sm text-muted-foreground">
                          Strong proficiency in full-stack development with modern frameworks
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Achievements</p>
                        <p className="text-sm text-muted-foreground">
                          Multiple hackathon wins demonstrate problem-solving abilities
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Hackathons Tab */}
              <TabsContent value="hackathons" className="space-y-4">
                {hackathons.map((hackathon) => (
                  <Card key={hackathon.name} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="font-bold text-lg">{hackathon.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{hackathon.role}</span>
                          <span>•</span>
                          <span>{hackathon.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={hackathon.result.includes("Place") ? "default" : "outline"}>
                            {hackathon.result}
                          </Badge>
                          {hackathon.prize !== "-" && (
                            <Badge variant="secondary">{hackathon.prize}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              {/* Badges Tab */}
              <TabsContent value="badges">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {badges.map((badge) => (
                    <Card key={badge.name} className={`p-6 text-center ${badge.color}`}>
                      <div className="text-4xl mb-2">{badge.icon}</div>
                      <p className="font-medium">{badge.name}</p>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
