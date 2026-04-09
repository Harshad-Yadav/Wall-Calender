import { useState } from "react";
import { format } from "date-fns";
import type { CalendarNote, DateRange } from "@/hooks/useCalendar";
import { X, Plus } from "lucide-react";

interface NotesPanelProps {
  notes: CalendarNote[];
  onAdd: (text: string) => void;
  onDelete: (id: string) => void;
  range: DateRange;
  currentMonth: Date;
}

const NotesPanel = ({ notes, onAdd, onDelete, range, currentMonth }: NotesPanelProps) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    onAdd(input.trim());
    setInput("");
  };

  const label = range.start && range.end
    ? `${format(range.start, "MMM d")} – ${format(range.end, "MMM d")}`
    : range.start
    ? format(range.start, "MMM d")
    : format(currentMonth, "MMMM yyyy");

  return (
    <div className="px-3 sm:px-6 py-4">
      <h3 className="font-serif text-sm font-semibold text-foreground mb-1">Notes</h3>
      <p className="text-[10px] sm:text-xs text-muted-foreground mb-3 font-sans">{label}</p>

      {/* Note lines */}
      <div className="space-y-0 mb-3 max-h-40 overflow-y-auto">
        {notes.length === 0 && (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 border-b note-line" />
            ))}
          </div>
        )}
        {notes.map((note) => (
          <div
            key={note.id}
            className="group flex items-center justify-between border-b note-line py-1.5 text-xs sm:text-sm font-sans text-foreground"
          >
            <span className="flex-1 truncate">{note.text}</span>
            <button
              onClick={() => onDelete(note.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-muted-foreground hover:text-destructive"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Add note */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Add a note..."
          className="flex-1 text-xs sm:text-sm font-sans bg-transparent border-b note-line focus:border-primary outline-none py-1.5 text-foreground placeholder:text-muted-foreground transition-colors"
        />
        <button
          onClick={handleAdd}
          className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
};

export default NotesPanel;
