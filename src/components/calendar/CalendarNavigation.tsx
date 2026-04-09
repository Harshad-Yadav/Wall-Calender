import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  onClearRange: () => void;
  hasRange: boolean;
}

const CalendarNavigation = ({ onPrev, onNext, onClearRange, hasRange }: CalendarNavigationProps) => {
  return (
    <div className="flex items-center justify-between px-3 sm:px-6 pt-3">
      <button
        onClick={onPrev}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft size={18} />
      </button>

      {hasRange && (
        <button
          onClick={onClearRange}
          className="text-[10px] sm:text-xs font-sans text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
        >
          Clear selection
        </button>
      )}

      <button
        onClick={onNext}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default CalendarNavigation;
