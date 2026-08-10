export type JobStatus = "confirmed" | "pending";
export type JobType = "house" | "hotel" | "building2";

export interface Job {
  id: number;
  client: string;
  treatment: string;
  time: string;
  place: string;
  type: JobType;
  status: JobStatus;
  fee: string;
  eta: string;
  notes: string;
}

export interface EarningsStat {
  label: string;
  value: string;
  meta: string;
}

export interface ConsoleData {
  therapist: { name: string; rating: number; reviews: number };
  jobs: Job[];
  earnings: EarningsStat[];
}

export const CONSOLE_DATA: ConsoleData = {
  therapist: { name: "Marta K.", rating: 4.9, reviews: 212 },
  jobs: [
    {
      id: 1,
      client: "Helena R.",
      treatment: "Deep tissue · 60 min",
      time: "18:30",
      place: "Chelsea, SW3 4RY",
      type: "house",
      status: "confirmed",
      fee: "£65",
      eta: "25 min away",
      notes: "Tight right shoulder. Cat in the flat.",
    },
    {
      id: 2,
      client: "David N.",
      treatment: "Swedish · 90 min",
      time: "20:15",
      place: "The Connaught, Mayfair W1K",
      type: "hotel",
      status: "confirmed",
      fee: "£95",
      eta: "Room 412 · check in at reception",
      notes: "Long-haul flight this morning.",
    },
    {
      id: 3,
      client: "Priya S.",
      treatment: "Aromatherapy · 60 min",
      time: "09:00 tomorrow",
      place: "Canary Wharf, E14",
      type: "building2",
      status: "pending",
      fee: "£70",
      eta: "Awaiting your response",
      notes: "Prefers lavender blend.",
    },
    {
      id: 4,
      client: "Tom B.",
      treatment: "Sports · 60 min",
      time: "12:00",
      place: "Islington, N1",
      type: "house",
      status: "confirmed",
      fee: "£80",
      eta: "15 min away",
      notes: "Hamstring tightness after a marathon. Prefers firmer pressure.",
    },
  ],
  earnings: [
    { label: "This week", value: "£860", meta: "11 sessions" },
    { label: "Awaiting payout", value: "£210", meta: "Paid Fridays" },
    { label: "Acceptance rate", value: "96%", meta: "Last 30 days" },
    { label: "Average rating", value: "4.9", meta: "212 reviews" },
  ],
};

export const WEEK = ["Mon 10", "Tue 11", "Wed 12", "Thu 13", "Fri 14", "Sat 15", "Sun 16"];
