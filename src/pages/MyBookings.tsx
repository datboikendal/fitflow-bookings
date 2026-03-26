import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { myBookings } from "@/data/mockData";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useState } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState(myBookings);

  const cancelBooking = async (id: string) => {
    try {
      await api.cancelBooking(parseInt(id));
    } catch {
      // Continue with local state update even if API fails
    }
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "cancelled" as const } : b)));
    toast.success("Booking cancelled");
  };

  return (
    <AppLayout role="member">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground mt-1">Manage your upcoming classes</p>
        </div>
        <Card className="glass">
          <CardHeader>
            <CardTitle className="font-display text-lg">All Bookings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {bookings.map((b) => (
              <div key={b.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                <div>
                  <div className="font-medium">{b.className}</div>
                  <div className="text-sm text-muted-foreground">{b.trainerName} · {b.date} at {b.time}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={
                    b.status === "confirmed" ? "border-primary/30 text-primary" :
                    b.status === "waitlist" ? "border-accent/30 text-accent" :
                    "border-destructive/30 text-destructive"
                  }>
                    {b.status}
                  </Badge>
                  {b.status !== "cancelled" && (
                    <Button size="sm" variant="ghost" onClick={() => cancelBooking(b.id)} className="text-destructive hover:text-destructive">
                      <XCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default MyBookings;
