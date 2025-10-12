import { useState } from "react";
import { Send, Bot, Lightbulb, Code, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import ChatBox from "../components/ChatBox";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "Hi! I'm your AI Copilot. How can I help you with your hackathon project today?",
      timestamp: new Date(),
    },
  ]);

  const suggestions = [
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: "Project Ideas",
      description: "Get innovative project suggestions",
    },
    {
      icon: <Code className="h-5 w-5" />,
      title: "Code Help",
      description: "Debug and optimize your code",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Best Practices",
      description: "Learn industry standards",
    },
  ];

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: "ai",
        content: "I'd be happy to help with that! Let me provide some suggestions...",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Conversations & Suggestions */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">AI Copilot</h2>
              <p className="text-sm text-muted-foreground">
                Your intelligent hackathon assistant
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium">Quick Actions</h3>
              {suggestions.map((suggestion) => (
                <Card
                  key={suggestion.title}
                  className="p-4 cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => setMessage(suggestion.description)}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {suggestion.icon}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{suggestion.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {suggestion.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <ChatBox messages={messages} />

            {/* Input Area */}
            <div className="mt-6">
              <Card className="p-4">
                <div className="flex gap-3">
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask me anything about your hackathon project..."
                    className="min-h-[100px] resize-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                  />
                  <Button
                    size="icon"
                    className="self-end"
                    onClick={handleSend}
                    disabled={!message.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Press Enter to send, Shift + Enter for new line
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
