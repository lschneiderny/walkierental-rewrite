// Quote-related type definitions

export interface QuoteItem {
  packageId: string;
  packageName: string;
  dailyRate: number;
  weeklyRate: number;
  quantity: number;
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

