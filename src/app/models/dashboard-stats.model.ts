export interface Stats {
  totalRevenue: number;
  totalOrders: number;
  completedOrders: number;
  activeRestaurants: number;
  restaurantOwners: number;
}

export interface StatsData {
  restaurantId: number;
  stats: Stats;
}

export interface StatsCard {
  title: string;
  value: number | string;
  icon: string;
  iconColor: string;
  iconBg: string;
  isCurrency?: boolean;
}

export interface StatsCardsElementConfig {
  totalRevenue: StatsCard;
  totalOrders: StatsCard;
  completedOrders: StatsCard;
  activeRestaurants?: StatsCard;
  restaurantOwners?: StatsCard;
}

export type StatType =
  | 'totalRevenue'
  | 'totalOrders'
  | 'completedOrders'
  | 'activeRestaurants'
  | 'restaurantOwners';
