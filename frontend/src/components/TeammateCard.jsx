import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";

const TeammateCard = ({ name, role, skills, availability }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
      
      <div className="relative p-6 space-y-4">
        {/* Avatar & Info */}
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarFallback className="bg-gradient-primary text-white text-lg font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold truncate group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground">{role}</p>
            <Badge variant="secondary" className="mt-2 text-xs">
              {availability}
            </Badge>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity" size="sm">
            Connect
          </Button>
          <Button variant="outline" size="icon">
            <Github className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Linkedin className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeammateCard;
