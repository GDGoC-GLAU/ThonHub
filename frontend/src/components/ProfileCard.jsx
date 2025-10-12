import { Github, Linkedin, Mail, MapPin, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";

const ProfileCard = ({ user }) => {
  return (
    <Card className="p-6">
      <div className="flex flex-col items-center text-center space-y-4">
        <Avatar className="h-24 w-24">
          <AvatarFallback className="text-2xl bg-gradient-primary text-white">
            {user.avatar}
          </AvatarFallback>
        </Avatar>

        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-muted-foreground">{user.username}</p>
          <p className="text-sm text-primary font-medium mt-1">{user.role}</p>
        </div>

        <div className="w-full space-y-3 pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{user.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span className="truncate">{user.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Joined {user.joinDate}</span>
          </div>
        </div>

        <div className="flex gap-2 w-full pt-4">
          <Button variant="outline" size="sm" className="flex-1">
            <Github className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Linkedin className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
