import { MapPin, Users, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const HackathonCard = ({
  title,
  organizer,
  date,
  location,
  participants,
  tags = [],
  featured = false,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex flex-col w-[260px] h-[240px]">
      {featured && (
        <div className="absolute top-2 right-2 z-10">
          <Badge className="bg-gradient-primary text-white border-0 text-xs px-2 py-0.5">Featured</Badge>
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
      
      <div className="relative p-4 flex flex-col h-full">
        <div className="flex-1 space-y-2.5">
          <h3 className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors mb-1">
            {title}
          </h3>
          
          <p className="text-sm text-muted-foreground">by {organizer}</p>
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span className="truncate">{date}</span>
            </div>
            
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{location}</span>
            </div>
            
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>{participants.toLocaleString()}</span>
            </div>
          </div>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-3 pt-3 border-t border-border">
          <Button className="w-full h-7 text-xs px-3" size="sm">
            Join
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HackathonCard;
