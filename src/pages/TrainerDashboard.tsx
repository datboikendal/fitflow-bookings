import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Calendar, CheckCircle, XCircle } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { weeklySchedule } from "@/data/mockData";
import { api, ApiRosterEntry } from "@/lib/api";
import { toast } from "sonner";

const mockRoster = [
  { id: "1", name: "John Doe", status: "present" as const },
  { id: "2", name: "Jane Smith", status: "present" as const },
  { id: "3", name: "Mike Johnson", status: "absent" as const },
  { id: "4", name: "Emily Davis", status: "present" as const },
  { id: "5", name: "Chris Lee", status: null as null },
  { id: "6", name: "Anna Brown", status: null as null },
];

const TrainerDashboard = () => {
  const myClasses = weeklySchedule.filter((c) => c.trainerId === "1");
  const [selectedClassId, setSelectedClassId] = useState(myClasses[0]?.id);
  const [roster, setRoster] = useState(mockRoster);

  useEffect(() => {
    if (!selectedClassId) return;
    const fetchRoster = async () => {
      try {
        const data = await api.getRoster(parseInt(selectedClassId));
        if (data && data.length > 0) {
          setRoster(data.map((r) => ({
            id: r.booking_id.toString(),
            name: r.member_name,
            status: r.status,
          })));
        }
      } catch {
        // Use mock data
      }
    };
    fetchRoster();
  }, [selectedClassId]);

  const markAttendance = async (memberId: string, status: "present" | "absent") => {
    try {
      await api.markAttendance(parseInt(memberId), status);
    } catch {
      // Continue with local state
    }
    setRoster((prev) => prev.map((m) => (m.id === memberId ? { ...m, status } : m)));
    toast.success(`Marked ${status}`);
  };

  return (
    <AppLayout role="trainer">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Trainer Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your classes and attendance</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="glass">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">My Classes</span>
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <div className="font-display text-2xl font-bold">{myClasses.length}</div>
              <div className="text-xs text-muted-foreground">this week</div>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total Students</span>
                <Users className="h-4 w-4 text-cyan" />
              </div>
              <div className="font-display text-2xl font-bold">{myClasses.reduce((s, c) => s + c.booked, 0)}</div>
              <div className="text-xs text-muted-foreground">across all classes</div>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Avg Attendance</span>
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <div className="font-display text-2xl font-bold">87%</div>
              <div className="text-xs text-muted-foreground">last 30 days</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="glass lg:col-span-1">
            <CardHeader>
              <CardTitle className="font-display text-lg">My Classes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {myClasses.map((cls) => (
                <button
                  key={cls.id}
                  onClick={() => setSelectedClassId(cls.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedClassId === cls.id ? "bg-primary/10 border border-primary/30" : "bg-secondary/50 hover:bg-secondary"
                  }`}
                >
                  <div className="font-medium text-sm">{cls.name}</div>
                  <div className="text-xs text-muted-foreground">{cls.day} at {cls.time} · {cls.booked}/{cls.capacity}</div>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="glass lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display text-lg">Class Roster & Attendance</CardTitle>
              <Badge className="bg-primary/20 text-primary border-primary/30">{roster.filter((m) => m.status === "present").length}/{roster.length} present</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {roster.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="font-medium text-sm">{member.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {member.status && (
                        <Badge variant="outline" className={member.status === "present" ? "border-primary/30 text-primary" : "border-destructive/30 text-destructive"}>
                          {member.status}
                        </Badge>
                      )}
                      <Button size="sm" variant={member.status === "present" ? "default" : "outline"} onClick={() => markAttendance(member.id, "present")} className="h-8 w-8 p-0">
                        <CheckCircle className="h-3.5 w-3.5" />
                      </Button>
                      <Button size="sm" variant={member.status === "absent" ? "destructive" : "outline"} onClick={() => markAttendance(member.id, "absent")} className="h-8 w-8 p-0">
                        <XCircle className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default TrainerDashboard;
