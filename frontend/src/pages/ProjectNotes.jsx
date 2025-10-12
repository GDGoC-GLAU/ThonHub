import { useState } from "react";
import { Plus, Save, Trash2, FileText } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

const ProjectNotes = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Initial Project Ideas",
      content: "Brainstorming session notes:\n- AI-powered code reviewer\n- Climate tracking app\n- Decentralized social network",
      date: "2024-12-10",
    },
    {
      id: 2,
      title: "Tech Stack Decision",
      content: "Decided to use:\n- Frontend: React + Tailwind\n- Backend: Node.js + Express\n- Database: PostgreSQL\n- AI: OpenAI API",
      date: "2024-12-11",
    },
  ]);

  const [selectedNote, setSelectedNote] = useState(notes[0]);
  const [isEditing, setIsEditing] = useState(false);

  const handleNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: "New Note",
      content: "",
      date: new Date().toISOString().split("T")[0],
    };
    setNotes([...notes, newNote]);
    setSelectedNote(newNote);
    setIsEditing(true);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (selectedNote?.id === id && notes.length > 1) {
      setSelectedNote(notes[0]);
    }
  };

  const handleSave = () => {
    setNotes(notes.map((note) => (note.id === selectedNote.id ? selectedNote : note)));
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Project Notes</h1>
            <p className="text-muted-foreground">
              Keep track of your hackathon project ideas and progress
            </p>
          </div>
          <Button onClick={handleNewNote}>
            <Plus className="mr-2 h-4 w-4" />
            New Note
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Notes List */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="text-lg font-bold mb-4">All Notes ({notes.length})</h2>
            {notes.map((note) => (
              <Card
                key={note.id}
                className={`p-4 cursor-pointer transition-all ${
                  selectedNote?.id === note.id
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary/50"
                }`}
                onClick={() => {
                  setSelectedNote(note);
                  setIsEditing(false);
                }}
              >
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{note.title}</p>
                    <p className="text-xs text-muted-foreground">{note.date}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Note Editor */}
          <div className="lg:col-span-3">
            {selectedNote ? (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">
                    {isEditing ? "Edit Note" : selectedNote.title}
                  </h2>
                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button size="sm" onClick={handleSave}>
                          <Save className="mr-2 h-4 w-4" />
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" onClick={() => setIsEditing(true)}>
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteNote(selectedNote.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Title</label>
                      <Input
                        value={selectedNote.title}
                        onChange={(e) =>
                          setSelectedNote({ ...selectedNote, title: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Content</label>
                      <Textarea
                        value={selectedNote.content}
                        onChange={(e) =>
                          setSelectedNote({ ...selectedNote, content: e.target.value })
                        }
                        className="min-h-[400px] font-mono"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Last modified: {selectedNote.date}
                    </div>
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap font-sans">
                        {selectedNote.content}
                      </pre>
                    </div>
                  </div>
                )}
              </Card>
            ) : (
              <Card className="p-12 text-center">
                <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-xl font-medium mb-2">No note selected</p>
                <p className="text-muted-foreground mb-6">
                  Select a note from the list or create a new one
                </p>
                <Button onClick={handleNewNote}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Note
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectNotes;
