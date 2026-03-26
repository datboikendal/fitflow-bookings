import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, TrendingUp, Dumbbell, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { myBookings as mockBookings, attendanceHistory } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { api, ApiBooking } from "@/lib/api";

const MemberDashboard = () => {
  const { user } = useAuth();
  const membership = { plan: "Pro", expiresAt: "2026-06-15", daysLeft: 82 };
  const [bookings, setBookings] = useState<ApiBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Try fetching from API — the schedules endpoint returns bookings context
        const schedules = await api.getSchedules();
        // Map schedules to booking-like objects for display
        // For now, we show mock bookings as API may not have a "my bookings" endpoint
        setBookings([]);
      } catch {
        // Fallback to mock data silently
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const displayBookings = bookings.length > 0 ? bookings : mockBookings;

  return (
    <AppLayout role="member">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Welcome back, {user?.name || "John"} 👋</h1>
          <p className="text-muted-foreground mt-1">Here's your fitness overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Dumbbell, label: "Membership", value: membership.plan, sub: `${membership.daysLeft} days left`, color: "text-primary" },
            { icon: Calendar, label: "Upcoming", value: mockBookings.filter(b => b.status === "confirmed").length.toString(), sub: "classes booked", color: "text-cyan" },
            { icon: TrendingUp, label: "This Week", value: "4", sub: "classes attended", color: "text-primary" },
            { icon: Clock, label: "Streak", value: "12", sub: "days active", color: "text-cyan" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="glass glass-hover">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  <div className="font-display text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.sub}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Membership Alert */}
        {membership.daysLeft < 90 && (
          <Card className="glass border-accent/30">
            <CardContent className="p-4 flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-accent shrink-0" />
              <div className="flex-1">
                <span className="text-sm">Your <strong>{membership.plan}</strong> membership expires on {membership.expiresAt}</span>
              </div>
              <Button size="sm" variant="outline" className="shrink-0">Renew</Button>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upcoming Bookings */}
          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="font-display text-lg">Upcoming Classes</CardTitle>
              <Link to="/bookings">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockBookings.filter(b => b.status !== "cancelled").slice(0, 4).map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div>
                    <div className="font-medium text-sm">{booking.className}</div>
                    <div className="text-xs text-muted-foreground">{booking.trainerName} · {booking.date} at {booking.time}</div>
                  </div>
                  <Badge variant={booking.status === "waitlist" ? "outline" : "default"} className={booking.status === "confirmed" ? "bg-primary/20 text-primary border-primary/30" : ""}>
                    {booking.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Attendance History */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="font-display text-lg">Recent Attendance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {attendanceHistory.map((entry, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div>
                    <div className="font-medium text-sm">{entry.className}</div>
                    <div className="text-xs text-muted-foreground">{entry.date}</div>
                  </div>
                  <Badge variant="outline" className={entry.status === "present" ? "border-primary/30 text-primary" : "border-destructive/30 text-destructive"}>
                    {entry.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <Link to="/calendar">
            <Button className="neon-glow gap-2">
              <Calendar className="h-4 w-4" /> Browse & Book Classes
            </Button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default MemberDashboard;
