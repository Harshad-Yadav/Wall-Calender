import { format, getDay } from "date-fns";

const DAY_HEADERS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

interface CalendarGridProps {
  weeks: Date[][];
  isCurrentMonth: (d: Date) => boolean;
  isToday: (d: Date) => boolean;
  isInRange: (d: Date) => boolean;
  isRangeStart: (d: Date) => boolean;
  isRangeEnd: (d: Date) => boolean;
  onSelectDate: (d: Date) => void;
}

const CalendarGrid = ({
  weeks,
  isCurrentMonth,
  isToday,
  isInRange,
  isRangeStart,
  isRangeEnd,
  onSelectDate,
}: CalendarGridProps) => {
  const isWeekend = (date: Date) => {
    const day = getDay(date);
    return day === 0 || day === 6;
  };

  return (
    <div className="px-3 sm:px-6 py-3">
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_HEADERS.map((d, i) => (
          <div
            key={d}
            className={`text-center text-[10px] sm:text-xs font-sans font-semibold tracking-wider py-1 ${
              i >= 5 ? "text-weekend" : "text-muted-foreground"
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Date rows */}
      {weeks.map((week, wi) => (
        <div key={wi} className="grid grid-cols-7">
          {week.map((date) => {
            const inMonth = isCurrentMonth(date);
            const today = isToday(date);
            const rangeStart = isRangeStart(date);
            const rangeEnd = isRangeEnd(date);
            const inRange = isInRange(date);
            const weekend = isWeekend(date);

            let cellClasses =
              "relative flex items-center justify-center h-8 sm:h-10 text-xs sm:text-sm font-sans cursor-pointer select-none transition-all duration-150 ";

            if (rangeStart || rangeEnd) {
              cellClasses += "bg-range-edge text-range-edge font-semibold rounded-full z-10 ";
            } else if (inRange) {
              cellClasses += "bg-range ";
            } else if (today && inMonth) {
              cellClasses += "bg-today text-range-edge font-bold rounded-full ";
            } else if (!inMonth) {
              cellClasses += "text-outside ";
            } else if (weekend) {
              cellClasses += "text-weekend ";
            } else {
              cellClasses += "text-foreground ";
            }

            if (!rangeStart && !rangeEnd && !inRange && inMonth) {
              cellClasses += "hover:bg-secondary rounded-full ";
            }

            let connectorClasses = "";
            if (rangeStart) {
              connectorClasses =
                "bg-range absolute inset-y-0 left-1/2 right-0";
            }
            if (rangeEnd) {
              connectorClasses =
                "bg-range absolute inset-y-0 left-0 right-1/2";
            }

            return (
              <div key={date.toISOString()} className="relative">
                {(rangeStart || rangeEnd) && (
                  <div className={connectorClasses} />
                )}
                {inRange && <div className="bg-range absolute inset-0" />}
                <div
                  className={cellClasses}
                  onClick={() => onSelectDate(date)}
                >
                  {format(date, "d")}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CalendarGrid;
