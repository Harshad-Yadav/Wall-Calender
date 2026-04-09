import { useState, useCallback, useMemo } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isAfter,
  isBefore,
  format,
} from "date-fns";

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface CalendarNote {
  id: string;
  text: string;
  date: string; // ISO string key for the range or month
  createdAt: number;
}

const STORAGE_KEY = "wall-calendar-notes";

function loadNotes(): CalendarNote[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveNotes(notes: CalendarNote[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function useCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [notes, setNotes] = useState<CalendarNote[]>(loadNotes);
  const [flipKey, setFlipKey] = useState(0);

  const weeks = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows: Date[][] = [];
    let day = calStart;
    while (day <= calEnd) {
      const week: Date[] = [];
      for (let i = 0; i < 7; i++) {
        week.push(day);
        day = addDays(day, 1);
      }
      rows.push(week);
    }
    return rows;
  }, [currentMonth]);

  const goNext = useCallback(() => {
    setCurrentMonth((m) => addMonths(m, 1));
    setFlipKey((k) => k + 1);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentMonth((m) => subMonths(m, 1));
    setFlipKey((k) => k + 1);
  }, []);

  const selectDate = useCallback(
    (date: Date) => {
      if (!range.start || (range.start && range.end)) {
        setRange({ start: date, end: null });
      } else {
        if (isBefore(date, range.start)) {
          setRange({ start: date, end: range.start });
        } else {
          setRange({ start: range.start, end: date });
        }
      }
    },
    [range]
  );

  const clearRange = useCallback(() => {
    setRange({ start: null, end: null });
  }, []);

  const isInRange = useCallback(
    (date: Date) => {
      if (!range.start || !range.end) return false;
      return isAfter(date, range.start) && isBefore(date, range.end);
    },
    [range]
  );

  const isRangeStart = useCallback(
    (date: Date) => (range.start ? isSameDay(date, range.start) : false),
    [range.start]
  );

  const isRangeEnd = useCallback(
    (date: Date) => (range.end ? isSameDay(date, range.end) : false),
    [range.end]
  );

  const isCurrentMonth = useCallback(
    (date: Date) => isSameMonth(date, currentMonth),
    [currentMonth]
  );

  const isToday = useCallback((date: Date) => isSameDay(date, new Date()), []);

  const noteKey = useMemo(() => {
    if (range.start && range.end)
      return `${format(range.start, "yyyy-MM-dd")}_${format(range.end, "yyyy-MM-dd")}`;
    if (range.start) return format(range.start, "yyyy-MM-dd");
    return format(currentMonth, "yyyy-MM");
  }, [range, currentMonth]);

  const currentNotes = useMemo(
    () => notes.filter((n) => n.date === noteKey),
    [notes, noteKey]
  );

  const addNote = useCallback(
    (text: string) => {
      const newNote: CalendarNote = {
        id: crypto.randomUUID(),
        text,
        date: noteKey,
        createdAt: Date.now(),
      };
      const updated = [...notes, newNote];
      setNotes(updated);
      saveNotes(updated);
    },
    [notes, noteKey]
  );

  const deleteNote = useCallback(
    (id: string) => {
      const updated = notes.filter((n) => n.id !== id);
      setNotes(updated);
      saveNotes(updated);
    },
    [notes]
  );

  return {
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
    noteKey,
    currentNotes,
    addNote,
    deleteNote,
  };
}
