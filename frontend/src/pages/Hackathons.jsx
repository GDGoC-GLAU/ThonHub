import { useState } from "react";
import { Search, Filter, Calendar } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import HackathonCard from "../components/HackathonCard";
import SearchBar from "../components/SearchBar";

const Hackathons = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "AI/ML", "Web3", "Climate", "FinTech", "IoT", "Security"];
  
  const hackathons = [
    {
      title: "AI Innovation Challenge 2024",
      organizer: "TechCorp",
      date: "Dec 15-17, 2024",
      location: "San Francisco, CA",
      participants: 1250,
      tags: ["AI/ML", "OpenAI", "Web3"],
      featured: true,
    },
    {
      title: "Climate Tech Hackathon",
      organizer: "GreenFuture",
      date: "Jan 10-12, 2025",
      location: "Online",
      participants: 890,
      tags: ["Climate", "IoT", "Data Science"],
    },
    {
      title: "FinTech Revolution",
      organizer: "BankInnovate",
      date: "Jan 20-22, 2025",
      location: "New York, NY",
      participants: 650,
      tags: ["Blockchain", "Finance", "Security"],
    },
    {
      title: "Web3 Gaming Hackathon",
      organizer: "GameDAO",
      date: "Feb 5-7, 2025",
      location: "Online",
      participants: 1100,
      tags: ["Web3", "Gaming", "NFT"],
    },
    {
      title: "HealthTech Innovation",
      organizer: "MedTech Labs",
      date: "Feb 15-17, 2025",
      location: "Boston, MA",
      participants: 780,
      tags: ["Healthcare", "AI/ML", "IoT"],
    },
    {
      title: "Cybersecurity Challenge",
      organizer: "SecureNet",
      date: "Mar 1-3, 2025",
      location: "Online",
      participants: 920,
      tags: ["Security", "Privacy", "Encryption"],
    },
  ];

  const filteredHackathons = hackathons.filter((hackathon) => {
    const matchesSearch = hackathon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hackathon.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || 
                           hackathon.tags.some(tag => tag.includes(selectedCategory));
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Discover Hackathons</h1>
          <p className="text-xl text-muted-foreground">
            Find and join exciting hackathons from around the world
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search hackathons..."
          />

          {/* Category Filters */}
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <span className="text-sm font-medium whitespace-nowrap">Categories:</span>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer whitespace-nowrap"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex gap-3 flex-wrap">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              This Week
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              This Month
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Online Only
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Featured
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredHackathons.length} hackathon{filteredHackathons.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Hackathon Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHackathons.map((hackathon) => (
            <HackathonCard key={hackathon.title} {...hackathon} />
          ))}
        </div>

        {/* Empty State */}
        {filteredHackathons.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">
              No hackathons found. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hackathons;
