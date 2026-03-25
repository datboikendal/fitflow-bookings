import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Dumbbell, Calendar, Users, BarChart3, ArrowRight, Zap, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { membershipPlans } from "@/data/mockData";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-border/30">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Dumbbell className="h-7 w-7 text-primary" />
            <span className="font-display text-xl font-bold tracking-tight">FitCore</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#plans" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Plans</a>
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <Link to="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="neon-glow">Get Started</Button>
            </Link>
          </div>
          <Link to="/login" className="md:hidden">
            <Button size="sm">Log in</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(135_100%_55%/0.08),transparent_60%)]" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8">
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">Next-gen fitness platform</span>
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Train Smarter.{" "}
              <span className="gradient-text">Book Faster.</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              The all-in-one membership and class booking system for modern fitness studios. Manage schedules, track attendance, and grow your community.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="neon-glow text-base px-8 gap-2">
                  Start Free Trial <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="text-base px-8 border-border/50">
                  View Demo
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-20"
            initial="hidden"
            animate="visible"
          >
            {[
              { value: "10K+", label: "Active Members" },
              { value: "500+", label: "Classes/Week" },
              { value: "98%", label: "Satisfaction" },
            ].map((stat, i) => (
              <motion.div key={stat.label} variants={fadeUp} custom={i + 4} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted-foreground max-w-md mx-auto">Powerful tools for members, trainers, and admins — all in one platform.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Calendar, title: "Smart Scheduling", desc: "Auto-generate recurring classes with conflict detection" },
              { icon: Users, title: "Capacity Control", desc: "Real-time booking limits with waitlist management" },
              { icon: BarChart3, title: "Analytics", desc: "Track peak hours, utilization, and member activity" },
              { icon: Shield, title: "Secure Auth", desc: "Token-based authentication with role management" },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass glass-hover rounded-xl p-6 group cursor-default"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:neon-glow transition-shadow">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Membership Plans</h2>
            <p className="text-muted-foreground">Choose the plan that fits your fitness journey.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {membershipPlans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`rounded-2xl p-8 relative ${
                  plan.popular
                    ? "glass neon-border"
                    : "glass"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    Most Popular
                  </div>
                )}
                <h3 className="font-display text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-display text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground text-sm">/{plan.duration}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register">
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    {plan.popular ? "Get Started" : "Choose Plan"}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-primary" />
            <span className="font-display font-bold">FitCore</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 FitCore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
