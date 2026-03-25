import { motion } from "framer-motion";
import { Users, DollarSign, Calendar, TrendingUp, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import AppLayout from "@/components/AppLayout";
import { analyticsData, membershipPlans, trainers, weeklySchedule } from "@/data/mockData";

const COLORS = ["hsl(135,100%,55%)", "hsl(175,100%,45%)", "hsl(45,100%,55%)", "hsl(280,100%,60%)", "hsl(0,80%,55%)"];

const AdminDashboard = () => {
  return (
    <AppLayout role="admin">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">System overview and analytics</p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Total Members", value: analyticsData.totalMembers.toLocaleString(), change: "+12%", color: "text-primary" },
            { icon: TrendingUp, label: "Active Today", value: analyticsData.activeToday.toString(), change: "+5%", color: "text-cyan" },
            { icon: Calendar, label: "Classes Today", value: analyticsData.classesToday.toString(), change: "On track", color: "text-primary" },
            { icon: DollarSign, label: "Monthly Revenue", value: `$${analyticsData.revenue.toLocaleString()}`, change: "+8%", color: "text-cyan" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="glass glass-hover">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  <div className="font-display text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-primary mt-1">{stat.change}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Peak Hours */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="font-display text-lg">Peak Booking Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={analyticsData.peakHours}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
                  <XAxis dataKey="hour" tick={{ fill: "hsl(220 10% 55%)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "hsl(220 10% 55%)", fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(220 18% 10%)", border: "1px solid hsl(220 15% 18%)", borderRadius: "8px", color: "hsl(0 0% 95%)" }} />
                  <Bar dataKey="bookings" fill="hsl(135 100% 55%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Weekly Activity */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="font-display text-lg">Weekly Member Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={analyticsData.weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
                  <XAxis dataKey="day" tick={{ fill: "hsl(220 10% 55%)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "hsl(220 10% 55%)", fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(220 18% 10%)", border: "1px solid hsl(220 15% 18%)", borderRadius: "8px", color: "hsl(0 0% 95%)" }} />
                  <Area type="monotone" dataKey="members" stroke="hsl(175 100% 45%)" fill="hsl(175 100% 45% / 0.1)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Class Utilization */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="font-display text-lg">Class Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.classUtilization.map((cls, i) => (
                  <div key={cls.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{cls.name}</span>
                      <span className="text-muted-foreground">{cls.utilization}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${cls.utilization}%`, backgroundColor: COLORS[i] }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Plans Overview */}
          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display text-lg">Membership Plans</CardTitle>
              <Button size="sm" variant="outline" className="gap-1"><Plus className="h-3 w-3" /> Add</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {membershipPlans.map((plan) => (
                <div key={plan.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div>
                    <div className="font-medium text-sm">{plan.name}</div>
                    <div className="text-xs text-muted-foreground">{plan.features.length} features</div>
                  </div>
                  <span className="font-display font-bold">${plan.price}<span className="text-xs text-muted-foreground font-normal">/mo</span></span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Trainers Overview */}
          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display text-lg">Trainers</CardTitle>
              <Button size="sm" variant="outline" className="gap-1"><Plus className="h-3 w-3" /> Add</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {trainers.map((trainer) => (
                <div key={trainer.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">{trainer.avatar}</div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{trainer.name}</div>
                    <div className="text-xs text-muted-foreground">{trainer.specialty}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;
