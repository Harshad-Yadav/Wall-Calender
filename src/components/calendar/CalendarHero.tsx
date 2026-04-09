import { format } from "date-fns";
import heroImage from "@/assets/calendar-hero-january.jpg";

interface CalendarHeroProps {
  currentMonth: Date;
  flipKey: number;
}

const CalendarHero = ({ currentMonth }: CalendarHeroProps) => {
  return (
    <div className="relative overflow-hidden h-48 sm:h-56 md:h-64 lg:h-full lg:min-h-[480px]">
      <img
        src={heroImage}
        alt="Calendar hero - mountain landscape"
        className="w-full h-full object-cover"
        width={1280}
        height={720}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
      <div className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6 text-right">
        <p className="text-sm lg:text-base font-sans font-light tracking-widest text-primary-foreground/90 drop-shadow-md">
          {format(currentMonth, "yyyy")}
        </p>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold tracking-wide text-primary-foreground drop-shadow-lg">
          {format(currentMonth, "MMMM").toUpperCase()}
        </h1>
      </div>
    </div>
  );
};

export default CalendarHero;
