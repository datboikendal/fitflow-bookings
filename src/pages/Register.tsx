import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dumbbell, Mail, Lock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { membershipPlans } from "@/data/mockData";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { ApiError } from "@/lib/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("2");
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await register({ name, email, password, password_confirmation: confirmPassword });
      toast.success("Account created! Welcome to FitCore.");
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.errors) {
          const firstError = Object.values(error.errors)[0]?.[0];
          toast.error(firstError || error.message);
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-lg">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <Dumbbell className="h-6 w-6 text-primary" />
          <span className="font-display text-xl font-bold">FitCore</span>
        </Link>
        <h1 className="font-display text-2xl font-bold mb-2">Create your account</h1>
        <p className="text-muted-foreground text-sm mb-8">Start your fitness journey today</p>
        
        <form onSubmit={handleRegister} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="name" placeholder="John Doe" className="pl-10" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-10" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="confirmPassword" type="password" placeholder="••••••••" className="pl-10" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Select a Plan</Label>
            <div className="grid grid-cols-3 gap-3">
              {membershipPlans.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`rounded-xl p-4 text-left transition-all border ${
                    selectedPlan === plan.id
                      ? "border-primary/50 bg-primary/5 neon-border"
                      : "border-border bg-card hover:border-border/80"
                  }`}
                >
                  <div className="font-display font-semibold text-sm">{plan.name}</div>
                  <div className="text-lg font-bold mt-1">${plan.price}<span className="text-xs text-muted-foreground font-normal">/mo</span></div>
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full neon-glow gap-2" size="lg" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create Account"} <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
