import { Bot, User } from "lucide-react";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

const ChatBox = ({ messages }) => {
  return (
    <Card className="p-6 h-[600px]">
      <ScrollArea className="h-full pr-4">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${
                message.type === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === "ai"
                    ? "bg-gradient-primary text-white"
                    : "bg-muted"
                }`}
              >
                {message.type === "ai" ? (
                  <Bot className="h-5 w-5" />
                ) : (
                  <User className="h-5 w-5" />
                )}
              </div>
              <div
                className={`flex-1 ${
                  message.type === "user" ? "text-right" : ""
                }`}
              >
                <div
                  className={`inline-block p-4 rounded-2xl ${
                    message.type === "ai"
                      ? "bg-muted"
                      : "bg-gradient-primary text-white"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default ChatBox;
