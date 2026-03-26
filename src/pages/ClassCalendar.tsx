import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, User, Users, ChevronLeft, ChevronRight, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import AppLayout from "@/components/AppLayout";
import { weeklySchedule as mockSchedule, FitnessClass } from "@/data/mockData";
import { api, ApiSchedule } from "@/lib/api";
import { toast } from "sonner";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const CATEGORY_COLORS: Record<string, string> = {
  HIIT: "hsl(135 100% 55%)",
  Yoga: "hsl(175 100% 45%)",
  CrossFit: "hsl(45 100% 55%)",
  Cardio: "hsl(280 100% 60%)",
  Pilates: "hsl(175 100% 45%)",
  Strength: "hsl(0 80% 55%)",
};

const mapScheduleToClass = (s: ApiSchedule): FitnessClass => ({
  id: s.id.toString(),
  name: s.name,
  trainerId: s.trainer_id.toString(),
  trainerName: s.trainer_name,
  time: s.time,
  date: s.date,
  day: s.day,
  capacity: s.capacity,
  booked: s.booked,
  duration: s.duration,
  category: s.category,
  color: CATEGORY_COLORS[s.category] || "hsl(135 100% 55%)",
});

const ClassCalendar = () => {
  const [selectedDay, setSelectedDay] = useState("Wednesday");
  const [bookingClass, setBookingClass] = useState<FitnessClass | null>(null);
  const [bookedIds, setBookedIds] = useState<Set<string>>(new Set(["1", "8", "11"]));
  const [classes, setClasses] = useState<FitnessClass[]>(mockSchedule);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const schedules = await api.getSchedules();
        if (schedules && schedules.length > 0) {
          setClasses(schedules.map(mapScheduleToClass));
        }
      } catch {
        // Use mock data as fallback
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, []);

  const dayClasses = classes.filter((c) => c.day === selectedDay);
  const isFull = (c: FitnessClass) => c.booked >= c.capacity;

  const handleBook = async (cls: FitnessClass) => {
    if (bookedIds.has(cls.id)) {
      try {
        await api.cancelBooking(parseInt(cls.id));
        setBookedIds((prev) => { const n = new Set(prev); n.delete(cls.id); return n; });
        toast.success(`Cancelled: ${cls.name}`);
      } catch {
        // Fallback to local state
        setBookedIds((prev) => { const n = new Set(prev); n.delete(cls.id); return n; });
        toast.success(`Cancelled: ${cls.name}`);
      }
    } else {
      try {
        await api.createBooking(parseInt(cls.id));
        setBookedIds((prev) => new Set(prev).add(cls.id));
        toast.success(isFull(cls) ? `Added to waitlist for ${cls.name}` : `Booked: ${cls.name}!`);
      } catch {
        // Fallback to local state
        setBookedIds((prev) => new Set(prev).add(cls.id));
        toast.success(isFull(cls) ? `Added to waitlist for ${cls.name}` : `Booked: ${cls.name}!`);
      }
    }
    setBookingClass(null);
  };

  const currentDayIdx = days.indexOf(selectedDay);

  return (
    <AppLayout role="member">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Class Schedule</h1>
          <p className="text-muted-foreground mt-1">Browse and book your classes</p>
        </div>

        {/* Day Selector */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setSelectedDay(days[Math.max(0, currentDayIdx - 1)])} disabled={currentDayIdx === 0}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 flex gap-1 overflow-x-auto pb-1">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  selectedDay === day ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
          <Button variant="ghost" size="icon" onClick={() => setSelectedDay(days[Math.min(6, currentDayIdx + 1)])} disabled={currentDayIdx === 6}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Classes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-3"
          >
            {dayClasses.length === 0 ? (
              <Card className="glass">
                <CardContent className="p-12 text-center text-muted-foreground">
                  No classes scheduled for {selectedDay}
                </CardContent>
              </Card>
            ) : (
              dayClasses.map((cls) => {
                const full = isFull(cls);
                const booked = bookedIds.has(cls.id);
                return (
                  <Card
                    key={cls.id}
                    className={`glass glass-hover cursor-pointer ${full && !booked ? "opacity-60" : ""} ${booked ? "neon-border" : ""}`}
                    onClick={() => setBookingClass(cls)}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-1 h-12 rounded-full" style={{ backgroundColor: cls.color }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-display font-semibold">{cls.name}</span>
                          {booked && <CheckCircle className="h-4 w-4 text-primary" />}
                          {full && !booked && <Badge variant="outline" className="text-xs border-destructive/30 text-destructive">Full</Badge>}
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><User className="h-3 w-3" />{cls.trainerName}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{cls.time} · {cls.duration}</span>
                          <span className="flex items-center gap-1"><Users className="h-3 w-3" />{cls.booked}/{cls.capacity}</span>
                        </div>
                      </div>
                      <div className="hidden sm:block">
                        <Badge className="bg-secondary text-secondary-foreground">{cls.category}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>

        {/* Booking Dialog */}
        <Dialog open={!!bookingClass} onOpenChange={() => setBookingClass(null)}>
          {bookingClass && (
            <DialogContent className="glass border-border/50">
              <DialogHeader>
                <DialogTitle className="font-display text-xl">{bookingClass.name}</DialogTitle>
                <DialogDescription>
                  {bookingClass.day} at {bookingClass.time} · {bookingClass.duration} · {bookingClass.trainerName}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 py-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <Badge className="bg-secondary text-secondary-foreground">{bookingClass.category}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Capacity</span>
                  <span>{bookingClass.booked}/{bookingClass.capacity} spots filled</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  {bookedIds.has(bookingClass.id) ? (
                    <span className="text-primary flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Booked</span>
                  ) : isFull(bookingClass) ? (
                    <span className="text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Full — Waitlist available</span>
                  ) : (
                    <span className="text-primary">Available</span>
                  )}
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(bookingClass.booked / bookingClass.capacity) * 100}%`,
                      backgroundColor: isFull(bookingClass) ? "hsl(var(--destructive))" : bookingClass.color,
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                {bookedIds.has(bookingClass.id) ? (
                  <Button variant="destructive" onClick={() => handleBook(bookingClass)} className="gap-2">
                    <XCircle className="h-4 w-4" /> Cancel Booking
                  </Button>
                ) : (
                  <Button onClick={() => handleBook(bookingClass)} className="neon-glow gap-2">
                    {isFull(bookingClass) ? "Join Waitlist" : "Book Class"}
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default ClassCalendar;
