import { Stats, StatsCard } from '@/models/dashboard-stats.model';
export const StatsConfig: Record<keyof Stats, Omit<StatsCard, 'value'>> = {
  totalRevenue: {
    title: 'Total Revenue',
    icon: 'attach_money',
    iconBg: '#4CAF5014',
    iconColor: '#2E7D32',
    isCurrency: true,
  },
  totalOrders: {
    title: 'Total Orders',
    icon: 'shopping_cart',
    iconBg: '#03A9F414',
    iconColor: '#0288D1',
  },
  completedOrders: {
    title: 'Completed Orders',
    icon: 'check_circle',
    iconBg: '#FF980014',
    iconColor: '#ED6C02',
  },
  activeRestaurants: {
    title: 'Active Restaurants',
    icon: 'local_dining',
    iconBg: '#9C27B014',
    iconColor: '#0E9F6E',
  },

  restaurantOwners: {
    title: 'Restaurant Owners',
    icon: 'local_pizza',
    iconBg: '#9C27B014',
    iconColor: '#9C27B0',
  },
};
