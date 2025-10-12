export interface Package {
  id: string;
  name: string;
  description: string;
  dailyRate: number;
  weeklyRate: number;
  includes: string[];
  bestFor: string[];
  specifications: {
    range: string;
    channels: number;
    batteryLife: string;
    accessories: string[];
  };
}

export const packages: Package[] = [
  {
    id: "basic-starter",
    name: "Basic Starter Package",
    description: "Perfect for small events and casual use. Reliable communication for up to 2 miles.",
    dailyRate: 15,
    weeklyRate: 75,
    includes: [
      "2 Motorola T100 Walkie Talkies",
      "Belt clips",
      "User manual",
      "Carrying case"
    ],
    bestFor: [
      "Small events (up to 20 people)",
      "Outdoor activities",
      "Basic coordination needs"
    ],
    specifications: {
      range: "Up to 2 miles",
      channels: 22,
      batteryLife: "18 hours",
      accessories: ["Belt clips", "Carrying case"]
    }
  },
  {
    id: "professional-event",
    name: "Professional Event Package",
    description: "Commercial-grade radios with extended range and professional features for medium to large events.",
    dailyRate: 35,
    weeklyRate: 200,
    includes: [
      "4 Motorola CP200d Digital Radios",
      "Chargers and batteries",
      "Headsets with PTT buttons",
      "Belt clips and holsters",
      "Programming included"
    ],
    bestFor: [
      "Corporate events",
      "Weddings and parties",
      "Security teams",
      "Production crews"
    ],
    specifications: {
      range: "Up to 5 miles",
      channels: 16,
      batteryLife: "12+ hours",
      accessories: ["Headsets", "Chargers", "Holsters", "Programming"]
    }
  },
  {
    id: "production-pro",
    name: "Production Pro Package",
    description: "High-end digital radios with noise cancellation and crystal-clear audio for professional productions.",
    dailyRate: 65,
    weeklyRate: 390,
    includes: [
      "6 Motorola MOTOTRBO DP4400e Radios",
      "Noise-cancelling headsets",
      "Multi-unit chargers",
      "Spare batteries",
      "Custom programming",
      "Belt clips and cases"
    ],
    bestFor: [
      "Film and TV productions",
      "Large corporate events",
      "Concert and festival staff",
      "Emergency response teams"
    ],
    specifications: {
      range: "Up to 8 miles",
      channels: 32,
      batteryLife: "16+ hours",
      accessories: ["Noise-cancelling headsets", "Multi chargers", "Spare batteries"]
    }
  },
  {
    id: "construction-heavy",
    name: "Construction Heavy Duty",
    description: "Rugged, waterproof radios built for harsh construction and industrial environments.",
    dailyRate: 45,
    weeklyRate: 270,
    includes: [
      "4 Motorola DP4800e Rugged Radios",
      "Heavy-duty cases",
      "Boom microphone headsets",
      "Vehicle chargers",
      "Emergency features enabled"
    ],
    bestFor: [
      "Construction sites",
      "Industrial facilities",
      "Outdoor work environments",
      "Emergency response"
    ],
    specifications: {
      range: "Up to 6 miles",
      channels: 32,
      batteryLife: "14+ hours",
      accessories: ["Rugged cases", "Vehicle chargers", "Boom mics"]
    }
  },
  {
    id: "long-range-outdoor",
    name: "Long Range Outdoor",
    description: "Maximum range radios for large outdoor areas, camping, and remote locations.",
    dailyRate: 25,
    weeklyRate: 150,
    includes: [
      "2 Midland GXT1000VP4 Radios",
      "Weather alerts enabled",
      "Desktop chargers",
      "Vehicle adapters",
      "Privacy codes"
    ],
    bestFor: [
      "Large outdoor events",
      "Camping and hiking",
      "Remote work sites",
      "Search and rescue"
    ],
    specifications: {
      range: "Up to 10+ miles",
      channels: 50,
      batteryLife: "10+ hours",
      accessories: ["Weather alerts", "Vehicle adapters", "Privacy codes"]
    }
  },
  {
    id: "hospitality-discreet",
    name: "Hospitality Discreet",
    description: "Low-profile radios with earpieces for hotels, restaurants, and customer-facing businesses.",
    dailyRate: 30,
    weeklyRate: 180,
    includes: [
      "4 Motorola SL300 Ultra-Thin Radios",
      "Discreet earpieces",
      "Vibrate alerts",
      "Desktop chargers",
      "Professional programming"
    ],
    bestFor: [
      "Hotels and resorts",
      "Restaurants and bars",
      "Retail establishments",
      "Customer service teams"
    ],
    specifications: {
      range: "Up to 3 miles",
      channels: 99,
      batteryLife: "11+ hours",
      accessories: ["Discreet earpieces", "Vibrate alerts", "Ultra-thin design"]
    }
  }
];

export const popularPackages = packages.slice(0, 3);