export interface ActiveClients {
  totalClient: number;
  activeClient: number;
  percentActiveClient: number;
}

export interface ActivityDay {
  clientId: number;
  activeDays: number;
}

export interface ChurnRate {
  churnedClientCount: number;
  totalClientCount: number;
}

export interface Cohort {
  cohort: string; // Формат: 'YYYY-MM'
  purchaseCount: number;
}

export interface LifetimeValue {
  clientId: number;
  lifetimeValue: number;
}

export interface PurchaseFrequency {
  clientId: number;
  purchaseFrequency: number;
}

export interface RepeatPurchaseRate {
  repeatClientCount: number;
  totalClientCount: number;
}

export interface MeanCheck {
  meanCheck: number;
}

export interface MainMetrics {
  activeClients: ActiveClients;
  activityDays: ActivityDay[];
  churnRate: ChurnRate;
  cohort: Cohort[];
  ltv: LifetimeValue[];
  meanLtv: number;
  purchaseFrequency: PurchaseFrequency[];
  repeatPurchaseRate: RepeatPurchaseRate;
  meanCheck: number;
}
