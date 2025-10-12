// Type definitions for the application

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
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InventoryItem {
  id: string;
  packageId: string;
  serialNumber: string;
  status: 'available' | 'rented' | 'maintenance' | 'retired';
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  lastServiced?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  packageId: string;
  inventoryItemId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  totalCost: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PackageWithAvailability extends Package {
  availableCount: number;
  totalCount: number;
}

