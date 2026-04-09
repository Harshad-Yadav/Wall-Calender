import { useCalendar } from "@/hooks/useCalendar";
import SpiralBinding from "./SpiralBinding";
import CalendarHero from "./CalendarHero";
import CalendarNavigation from "./CalendarNavigation";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";

const WallCalendar = () => {
  const {
    currentMonth,
    weeks,
    range,
    goNext,
    goPrev,
    selectDate,
    clearRange,
    isInRange,
    isRangeStart,
    isRangeEnd,
    isCurrentMonth,
    isToday,
    flipKey,
    currentNotes,
    addNote,
    deleteNote,
  } = useCalendar();

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="calendar-paper calendar-shadow rounded-lg overflow-hidden">
        {/* Spiral binding */}
        <SpiralBinding />

        {/* Desktop: side-by-side hero + calendar. Mobile: stacked */}
        <div className="flex flex-col lg:flex-row">
          {/* Left panel: Hero image */}
          <div className="lg:w-1/2">
            <CalendarHero currentMonth={currentMonth} flipKey={flipKey} />
          </div>

          {/* Right panel: Calendar grid + Notes */}
          <div className="lg:w-1/2 flex flex-col">
            <CalendarNavigation
              onPrev={goPrev}
              onNext={goNext}
              onClearRange={clearRange}
              hasRange={!!(range.start && range.end)}
            />

            <CalendarGrid
              weeks={weeks}
              isCurrentMonth={isCurrentMonth}
              isToday={isToday}
              isInRange={isInRange}
              isRangeStart={isRangeStart}
              isRangeEnd={isRangeEnd}
              onSelectDate={selectDate}
            />

            <div className="mx-6 border-t border-border" />

            <NotesPanel
              notes={currentNotes}
              onAdd={addNote}
              onDelete={deleteNote}
              range={range}
              currentMonth={currentMonth}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallCalendar;
