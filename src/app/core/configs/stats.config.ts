import { Stats, StatsCard } from '@/models/dashboard-stats.model';

export const StatsConfig: Record<keyof Stats, Omit<StatsCard, 'value'>> = {
  totalRevenue: {
    title: 'Total Revenue',
    icon: 'attach_money',
    itemClassName: 'total-revenue',
    isCurrency: true,
  },

  totalOrders: {
    title: 'Total Orders',
    icon: 'shopping_cart',
    itemClassName: 'total-orders',
  },

  completedOrders: {
    title: 'Completed Orders',
    icon: 'check_circle',
    itemClassName: 'complete-orders',
  },

  activeRestaurants: {
    title: 'Active Restaurants',
    icon: 'local_dining',
    itemClassName: 'active-restaurant',
  },

  restaurantOwners: {
    title: 'Restaurant Owners',
    icon: 'local_pizza',
    itemClassName: 'restaurant-owners',
  },
};
