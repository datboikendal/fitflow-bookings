export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
}

export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  bio: string;
}

export interface FitnessClass {
  id: string;
  name: string;
  trainerId: string;
  trainerName: string;
  time: string;
  date: string;
  day: string;
  capacity: number;
  booked: number;
  duration: string;
  category: string;
  color: string;
}

export interface Booking {
  id: string;
  classId: string;
  className: string;
  trainerName: string;
  date: string;
  time: string;
  status: "confirmed" | "waitlist" | "cancelled";
}

export const membershipPlans: MembershipPlan[] = [
  {
    id: "1",
    name: "Starter",
    price: 29,
    duration: "month",
    features: ["Access to gym floor", "2 classes/week", "Locker access", "Basic app access"],
  },
  {
    id: "2",
    name: "Pro",
    price: 59,
    duration: "month",
    features: ["Unlimited classes", "Personal trainer session/mo", "Sauna & pool", "Nutrition plan", "Priority booking"],
    popular: true,
  },
  {
    id: "3",
    name: "Elite",
    price: 99,
    duration: "month",
    features: ["Everything in Pro", "4 PT sessions/mo", "Guest passes", "Recovery zone", "24/7 access", "Custom programs"],
  },
];

export const trainers: Trainer[] = [
  { id: "1", name: "Alex Rivera", specialty: "HIIT & Strength", avatar: "AR", bio: "10+ years of high-intensity training" },
  { id: "2", name: "Sarah Chen", specialty: "Yoga & Pilates", avatar: "SC", bio: "Certified yoga instructor since 2015" },
  { id: "3", name: "Marcus Johnson", specialty: "CrossFit", avatar: "MJ", bio: "Former competitive CrossFit athlete" },
  { id: "4", name: "Elena Petrova", specialty: "Spinning & Cardio", avatar: "EP", bio: "Cardio specialist with dance background" },
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const weeklySchedule: FitnessClass[] = [
  { id: "1", name: "Power HIIT", trainerId: "1", trainerName: "Alex Rivera", time: "06:00", date: "2026-03-23", day: "Monday", capacity: 25, booked: 22, duration: "45min", category: "HIIT", color: "hsl(135 100% 55%)" },
  { id: "2", name: "Sunrise Yoga", trainerId: "2", trainerName: "Sarah Chen", time: "07:00", date: "2026-03-23", day: "Monday", capacity: 20, booked: 18, duration: "60min", category: "Yoga", color: "hsl(175 100% 45%)" },
  { id: "3", name: "CrossFit WOD", trainerId: "3", trainerName: "Marcus Johnson", time: "09:00", date: "2026-03-23", day: "Monday", capacity: 15, booked: 15, duration: "60min", category: "CrossFit", color: "hsl(45 100% 55%)" },
  { id: "4", name: "Spin Rush", trainerId: "4", trainerName: "Elena Petrova", time: "12:00", date: "2026-03-23", day: "Monday", capacity: 30, booked: 12, duration: "45min", category: "Cardio", color: "hsl(280 100% 60%)" },
  { id: "5", name: "Strength Foundations", trainerId: "1", trainerName: "Alex Rivera", time: "17:00", date: "2026-03-23", day: "Monday", capacity: 20, booked: 20, duration: "60min", category: "Strength", color: "hsl(0 80% 55%)" },
  { id: "6", name: "Evening Flow Yoga", trainerId: "2", trainerName: "Sarah Chen", time: "19:00", date: "2026-03-23", day: "Monday", capacity: 25, booked: 10, duration: "60min", category: "Yoga", color: "hsl(175 100% 45%)" },
  
  { id: "7", name: "Tabata Burn", trainerId: "1", trainerName: "Alex Rivera", time: "06:00", date: "2026-03-24", day: "Tuesday", capacity: 25, booked: 19, duration: "30min", category: "HIIT", color: "hsl(135 100% 55%)" },
  { id: "8", name: "Pilates Core", trainerId: "2", trainerName: "Sarah Chen", time: "08:00", date: "2026-03-24", day: "Tuesday", capacity: 20, booked: 14, duration: "50min", category: "Pilates", color: "hsl(175 100% 45%)" },
  { id: "9", name: "CrossFit Endurance", trainerId: "3", trainerName: "Marcus Johnson", time: "10:00", date: "2026-03-24", day: "Tuesday", capacity: 15, booked: 8, duration: "60min", category: "CrossFit", color: "hsl(45 100% 55%)" },
  { id: "10", name: "Cycle & Tone", trainerId: "4", trainerName: "Elena Petrova", time: "18:00", date: "2026-03-24", day: "Tuesday", capacity: 30, booked: 27, duration: "45min", category: "Cardio", color: "hsl(280 100% 60%)" },

  { id: "11", name: "Power HIIT", trainerId: "1", trainerName: "Alex Rivera", time: "06:00", date: "2026-03-25", day: "Wednesday", capacity: 25, booked: 16, duration: "45min", category: "HIIT", color: "hsl(135 100% 55%)" },
  { id: "12", name: "Vinyasa Flow", trainerId: "2", trainerName: "Sarah Chen", time: "07:00", date: "2026-03-25", day: "Wednesday", capacity: 20, booked: 20, duration: "60min", category: "Yoga", color: "hsl(175 100% 45%)" },
  { id: "13", name: "Functional Fitness", trainerId: "3", trainerName: "Marcus Johnson", time: "12:00", date: "2026-03-25", day: "Wednesday", capacity: 15, booked: 5, duration: "45min", category: "CrossFit", color: "hsl(45 100% 55%)" },
  { id: "14", name: "Spin Rush", trainerId: "4", trainerName: "Elena Petrova", time: "17:30", date: "2026-03-25", day: "Wednesday", capacity: 30, booked: 22, duration: "45min", category: "Cardio", color: "hsl(280 100% 60%)" },

  { id: "15", name: "Morning Burn", trainerId: "1", trainerName: "Alex Rivera", time: "06:00", date: "2026-03-26", day: "Thursday", capacity: 25, booked: 21, duration: "45min", category: "HIIT", color: "hsl(135 100% 55%)" },
  { id: "16", name: "Yin Yoga", trainerId: "2", trainerName: "Sarah Chen", time: "19:00", date: "2026-03-26", day: "Thursday", capacity: 20, booked: 7, duration: "75min", category: "Yoga", color: "hsl(175 100% 45%)" },

  { id: "17", name: "Friday Blitz", trainerId: "1", trainerName: "Alex Rivera", time: "06:00", date: "2026-03-27", day: "Friday", capacity: 25, booked: 25, duration: "45min", category: "HIIT", color: "hsl(135 100% 55%)" },
  { id: "18", name: "CrossFit Games Prep", trainerId: "3", trainerName: "Marcus Johnson", time: "09:00", date: "2026-03-27", day: "Friday", capacity: 12, booked: 11, duration: "90min", category: "CrossFit", color: "hsl(45 100% 55%)" },
  { id: "19", name: "Dance Cardio", trainerId: "4", trainerName: "Elena Petrova", time: "18:00", date: "2026-03-27", day: "Friday", capacity: 30, booked: 24, duration: "50min", category: "Cardio", color: "hsl(280 100% 60%)" },

  { id: "20", name: "Weekend Warrior", trainerId: "1", trainerName: "Alex Rivera", time: "09:00", date: "2026-03-28", day: "Saturday", capacity: 30, booked: 18, duration: "60min", category: "HIIT", color: "hsl(135 100% 55%)" },
  { id: "21", name: "Restorative Yoga", trainerId: "2", trainerName: "Sarah Chen", time: "11:00", date: "2026-03-28", day: "Saturday", capacity: 20, booked: 12, duration: "60min", category: "Yoga", color: "hsl(175 100% 45%)" },
];

export const myBookings: Booking[] = [
  { id: "1", classId: "1", className: "Power HIIT", trainerName: "Alex Rivera", date: "2026-03-23", time: "06:00", status: "confirmed" },
  { id: "2", classId: "8", className: "Pilates Core", trainerName: "Sarah Chen", date: "2026-03-24", time: "08:00", status: "confirmed" },
  { id: "3", classId: "11", className: "Power HIIT", trainerName: "Alex Rivera", date: "2026-03-25", time: "06:00", status: "confirmed" },
  { id: "4", classId: "5", className: "Strength Foundations", trainerName: "Alex Rivera", date: "2026-03-23", time: "17:00", status: "waitlist" },
];

export const attendanceHistory = [
  { date: "2026-03-17", className: "Power HIIT", status: "present" as const },
  { date: "2026-03-18", className: "Pilates Core", status: "present" as const },
  { date: "2026-03-19", className: "Spin Rush", status: "absent" as const },
  { date: "2026-03-20", className: "CrossFit WOD", status: "present" as const },
  { date: "2026-03-21", className: "Sunrise Yoga", status: "present" as const },
];

export const analyticsData = {
  peakHours: [
    { hour: "6AM", bookings: 45 },
    { hour: "7AM", bookings: 38 },
    { hour: "8AM", bookings: 22 },
    { hour: "9AM", bookings: 30 },
    { hour: "10AM", bookings: 18 },
    { hour: "12PM", bookings: 35 },
    { hour: "5PM", bookings: 48 },
    { hour: "6PM", bookings: 52 },
    { hour: "7PM", bookings: 40 },
  ],
  weeklyActivity: [
    { day: "Mon", members: 120 },
    { day: "Tue", members: 98 },
    { day: "Wed", members: 110 },
    { day: "Thu", members: 95 },
    { day: "Fri", members: 130 },
    { day: "Sat", members: 85 },
    { day: "Sun", members: 45 },
  ],
  classUtilization: [
    { name: "HIIT", utilization: 88 },
    { name: "Yoga", utilization: 72 },
    { name: "CrossFit", utilization: 92 },
    { name: "Cardio", utilization: 78 },
    { name: "Pilates", utilization: 65 },
  ],
  totalMembers: 847,
  activeToday: 156,
  classesToday: 12,
  revenue: 48750,
};
