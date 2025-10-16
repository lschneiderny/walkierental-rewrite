// Quote-related type definitions
import { HeadsetDistribution } from './types'

export type { HeadsetDistribution }

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

