// Quote-related type definitions

export interface HeadsetDistribution {
  '2-Wire Surveillance Kit': number;
  'HMN9013B Lightweight Headset': number;
  'Remote Speaker Microphone': number;
}

export interface QuoteItem {
  packageId: string;
  packageName: string;
  walkieCount?: number;
  batteriesPerWalkie?: number;
  dailyRate: number;
  weeklyRate: number;
  quantity: number;
  headsetDistribution?: HeadsetDistribution;
  rentalDuration?: number; // in days
}

export interface QuoteRequest {
  items: QuoteItem[];
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
  };
  projectInfo: {
    eventType: string;
    startDate: string;
    endDate: string;
    message?: string;
  };
}

