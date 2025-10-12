import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import TeammateCard from "../components/TeammateCard";
import SearchBar from "../components/SearchBar";

const Teammates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All");

  const skills = ["All", "Frontend", "Backend", "AI/ML", "Design", "DevOps", "Mobile"];
  
  const teammates = [
    {
      name: "Alex Chen",
      role: "Full Stack Developer",
      skills: ["React", "Node.js", "Python"],
      location: "San Francisco, CA",
      availability: "Available",
      github: "alexchen",
      linkedin: "alexchen",
    },
    {
      name: "Sarah Kim",
      role: "AI/ML Engineer",
      skills: ["TensorFlow", "PyTorch", "Python"],
      location: "Online",
      availability: "Available",
      github: "sarahkim",
      linkedin: "sarahkim",
    },
    {
      name: "Marcus Johnson",
      role: "UI/UX Designer",
      skills: ["Figma", "Sketch", "Adobe XD"],
      location: "New York, NY",
      availability: "Busy",
      github: "marcusj",
      linkedin: "marcusjohnson",
    },
    {
      name: "Priya Patel",
      role: "Backend Developer",
      skills: ["Java", "Spring", "PostgreSQL"],
      location: "Austin, TX",
      availability: "Available",
      github: "priyapatel",
      linkedin: "priyapatel",
    },
    {
      name: "David Lee",
      role: "DevOps Engineer",
      skills: ["Docker", "Kubernetes", "AWS"],
      location: "Seattle, WA",
      availability: "Available",
      github: "davidlee",
      linkedin: "davidlee",
    },
    {
      name: "Emma Wilson",
      role: "Mobile Developer",
      skills: ["React Native", "Flutter", "Swift"],
      location: "Online",
      availability: "Available",
      github: "emmawilson",
      linkedin: "emmawilson",
    },
  ];

  const stats = [
    { value: "50K+", label: "Developers" },
    { value: "25K+", label: "Teams Formed" },
    { value: "1,200+", label: "Hackathons" },
  ];

  const filteredTeammates = teammates.filter((teammate) => {
    const matchesSearch = teammate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teammate.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teammate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSkill = selectedSkill === "All" || 
                        teammate.skills.some(skill => skill.includes(selectedSkill));
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Find Your Dream Team</h1>
          <p className="text-xl text-muted-foreground">
            Connect with talented developers and designers for your next hackathon
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-12 p-6 rounded-2xl bg-card border border-border">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name, role, or skills..."
          />

          {/* Skill Filters */}
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <span className="text-sm font-medium whitespace-nowrap">Skills:</span>
            <div className="flex gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant={selectedSkill === skill ? "default" : "outline"}
                  className="cursor-pointer whitespace-nowrap"
                  onClick={() => setSelectedSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex gap-3 flex-wrap">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Available Now
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Online
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Verified
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredTeammates.length} teammate{filteredTeammates.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Teammates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeammates.map((teammate) => (
            <TeammateCard key={teammate.name} {...teammate} />
          ))}
        </div>

        {/* Empty State */}
        {filteredTeammates.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">
              No teammates found. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teammates;
