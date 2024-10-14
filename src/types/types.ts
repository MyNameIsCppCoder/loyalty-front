export type IAuthType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type IAllMetrics = {
  averagePurchaseFrequency: { clientId: number; purchaseFrequency: number }[];
  customerActivityDays: { clientId: number; activeDays: number }[];
  customerLifetimeValue: { clientId: number; lifetimeValue: number }[];
  churnRate: { totalClientCount: number; churnedClientCount: number };
  repeatPurchaseRate: { repeatClientCount: number; totalClientCount: number };
  activeClientByMentionedDay: { totalClient: number; activeClient: number; percentActiveClient: number };
  averageOrderValueByAllClient: number;
};

export type CreateDTO = {
  name?: string;
  phone: string;
  email?: string;
  cashbackPercentage?: number;
};

export type FormField = {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  validation?: any;
};

export type ModalFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

export interface ClientResponse {
  birthDate: string | null;
  cashbackPercentage: number;
  createdAt: string;
  email: string;
  id: number;
  name: string;
  phone: string;
  purchase: [];
  amount: number;
  totalCashback: number;
  updatedAt: string;
}

export interface ClientUpdate {
  name?: string;
  phone?: string;
  email?: string;
  birthDate?: string;
  cashbackPercentage?: number;
}
