import { Calendar, MapPin, Users, Award, Clock } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const HackathonDetails = ({ hackathon }) => {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">{hackathon?.title || "Hackathon Title"}</h2>
          <p className="text-muted-foreground">
            {hackathon?.organizer || "Organizer Name"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">{hackathon?.date || "TBD"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">{hackathon?.location || "TBD"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Participants</p>
              <p className="font-medium">{hackathon?.participants || 0}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Prize Pool</p>
              <p className="font-medium">$50,000</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {(hackathon?.tags || ["AI/ML", "Web3", "IoT"]).map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-3">Description</h3>
          <p className="text-muted-foreground">
            Join us for an exciting hackathon where you'll build innovative solutions
            and compete for amazing prizes. Connect with fellow developers and bring
            your ideas to life!
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <Button className="flex-1 bg-gradient-primary">Register Now</Button>
          <Button variant="outline" className="flex-1">Learn More</Button>
        </div>
      </div>
    </Card>
  );
};

export default HackathonDetails;
