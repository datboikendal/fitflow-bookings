import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dumbbell, LayoutDashboard, Calendar, ClipboardList, Users, BarChart3, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface AppLayoutProps {
  children: React.ReactNode;
  role?: "member" | "trainer" | "admin";
}

const memberLinks = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/calendar", icon: Calendar, label: "Classes" },
  { to: "/bookings", icon: ClipboardList, label: "My Bookings" },
];

const trainerLinks = [
  { to: "/trainer", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/trainer/roster", icon: Users, label: "Class Roster" },
];

const adminLinks = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/plans", icon: Settings, label: "Plans" },
  { to: "/admin/classes", icon: Calendar, label: "Classes" },
  { to: "/admin/trainers", icon: Users, label: "Trainers" },
  { to: "/admin/analytics", icon: BarChart3, label: "Analytics" },
];

const AppLayout = ({ children, role = "member" }: AppLayoutProps) => {
  const location = useLocation();
  const links = role === "admin" ? adminLinks : role === "trainer" ? trainerLinks : memberLinks;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border/30 bg-card/30">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-primary" />
            <span className="font-display text-lg font-bold">FitCore</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {links.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border/30">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">JD</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">John Doe</div>
              <div className="text-xs text-muted-foreground capitalize">{role}</div>
            </div>
          </div>
          <Link to="/" className="flex items-center gap-3 px-3 py-2 mt-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex-1 flex flex-col">
        <header className="md:hidden flex items-center justify-between p-4 border-b border-border/30">
          <Link to="/" className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-primary" />
            <span className="font-display font-bold">FitCore</span>
          </Link>
          <div className="flex items-center gap-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "p-2 rounded-lg",
                  location.pathname === link.to ? "bg-primary/10 text-primary" : "text-muted-foreground"
                )}
              >
                <link.icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </header>
        <main className="flex-1 p-6 md:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
