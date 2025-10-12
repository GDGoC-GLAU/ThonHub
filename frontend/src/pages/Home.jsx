import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowRight, Users, Zap, Award, Sparkles } from "lucide-react";
import HackathonCard from "../components/HackathonCard";
import Footer from "../components/Footer";
import { DottedSurface } from "../components/ui/dotted-surface";
import { cn } from '../lib/utils';

const Home = () => {
  const featuredHackathons = [
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
  ];

  const stats = [
    { value: "50K+", label: "Active Hackers" },
    { value: "1,200+", label: "Hackathons Hosted" },
    { value: "25K+", label: "Teams Formed" },
    { value: "95%", label: "Success Rate" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <DottedSurface className="absolute inset-0">
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute -top-10 left-1/2 size-full -translate-x-1/2 rounded-full',
                'bg-[radial-gradient(ellipse_at_center,hsl(var(--foreground)/.1),transparent_50%)]',
                'blur-[30px]',
              )}
            />
          </div>
        </DottedSurface>
        
        <div className="container mx-auto relative z-10">
          <div className="flex items-center justify-center">
            <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-primary font-medium">GenAI-Powered Collaboration</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Build the Future,{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Together
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join the world's largest hackathon platform. Connect with talented developers,
                discover exciting challenges, and bring your ideas to life with AI-powered tools.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/hackathons">
                  <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity">
                    Join a Hackathon
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/org-panel">
                  <Button size="lg" variant="outline">
                    Host a Hackathon
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 max-w-3xl mx-auto">
                {stats.slice(0, 4).map((stat) => (
                  <div key={stat.label} className="space-y-1">
                    <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Why ThonHub?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to succeed in your hackathon journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-2xl bg-card border border-border p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
              <div className="relative space-y-4">
                <div className="p-3 rounded-xl bg-primary/10 w-fit">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Find Your Team</h3>
                <p className="text-muted-foreground">
                  Connect with talented developers, designers, and innovators who share your passion
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-card border border-border p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
              <div className="relative space-y-4">
                <div className="p-3 rounded-xl bg-secondary/10 w-fit">
                  <Zap className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold">AI Copilot</h3>
                <p className="text-muted-foreground">
                  Get intelligent suggestions, code help, and project guidance powered by GenAI
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-card border border-border p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
              <div className="relative space-y-4">
                <div className="p-3 rounded-xl bg-accent/10 w-fit">
                  <Award className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold">Win & Showcase</h3>
                <p className="text-muted-foreground">
                  Build your portfolio, win prizes, and get recognized by top tech companies
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hackathons */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-bold">Featured Hackathons</h2>
              <p className="text-xl text-muted-foreground">
                Join the most exciting challenges happening now
              </p>
            </div>
            <Link to="/hackathons">
              <Button variant="outline" className="hidden md:flex">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredHackathons.map((hackathon) => (
              <HackathonCard key={hackathon.title} {...hackathon} />
            ))}
          </div>

          <div className="text-center md:hidden">
            <Link to="/hackathons">
              <Button variant="outline">
                View All Hackathons
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-2">
                <div className="text-5xl md:text-6xl font-bold">{stat.value}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-card border border-border p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-primary opacity-5" />
            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold">Ready to Start Building?</h2>
              <p className="text-xl text-muted-foreground">
                Join thousands of developers creating the future at hackathons worldwide
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Link to="/hackathons">
                  <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity">
                    Explore Hackathons
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
