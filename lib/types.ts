// Type definitions for the application

// Inventory Item Types
export type ItemStatus = 'available' | 'rented' | 'maintenance' | 'retired';
export type ItemCondition = 'excellent' | 'good' | 'fair' | 'poor';

export interface Walkie {
  id: string;
  model: 'Motorola CP200' | 'Motorola CP200d';
  serialNumber: string;
  status: ItemStatus;
  condition: ItemCondition;
  lastServiced?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Battery {
  id: string;
  model: string;
  serialNumber: string;
  status: ItemStatus;
  condition: ItemCondition;
  lastServiced?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Charger {
  id: string;
  model: 'CP200D 6-Bank Charger' | 'CP200D 12-Bank Charger' | 'CP200D Single-Bank Charger';
  serialNumber: string;
  bankCount: 1 | 6 | 12;
  status: ItemStatus;
  condition: ItemCondition;
  lastServiced?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type HeadsetType = '2-Wire Surveillance Kit' | 'HMN9013B Lightweight Headset' | 'Remote Speaker Microphone';

export interface Headset {
  id: string;
  type: HeadsetType;
  serialNumber: string;
  status: ItemStatus;
  condition: ItemCondition;
  lastServiced?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface HeadsetDistribution {
  '2-Wire Surveillance Kit': number;
  'HMN9013B Lightweight Headset': number;
  'Remote Speaker Microphone': number;
}

export interface WalkiePackage {
  id: string;
  name: string;
  walkieCount: 6 | 8 | 12 | 16 | 24 | 32;
  batteriesPerWalkie: number;
  headsetsPerWalkie: number;
  dailyRate: number;
  weeklyRate: number;
  headsetDistribution: HeadsetDistribution;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WalkiePackageInput {
  name: string;
  walkieCount: 6 | 8 | 12 | 16 | 24 | 32;
  dailyRate: number;
  weeklyRate: number;
  headsetDistribution?: HeadsetDistribution;
}

// Legacy types for backwards compatibility
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
  status: ItemStatus;
  condition: ItemCondition;
  lastServiced?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  packageId?: string;
  walkiePackageId?: string;
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

export interface WalkiePackageWithAvailability extends WalkiePackage {
  availableWalkies: number;
  totalWalkies: number;
  availableBatteries: number;
  totalBatteries: number;
  availableHeadsets: number;
  totalHeadsets: number;
}

