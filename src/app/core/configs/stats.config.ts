import { StatsCard } from '@/models';

export const StatsConfig = {
  totalRevenue: {
    title: 'Total Revenue',
    icon: 'attach_money',
    variant: 'primary',
    isCurrency: true,
  },
  totalOrders: {
    title: 'Total Orders',
    icon: 'shopping_cart',
    variant: 'secondary',
  },
  completedOrders: {
    title: 'Completed Orders',
    icon: 'check_circle',
    variant: 'tertiary',
  },
  activeRestaurants: {
    title: 'Active Restaurants',
    icon: 'local_dining',
    variant: 'primary',
  },
  restaurantOwners: {
    title: 'Restaurant Owners',
    icon: 'local_pizza',
    variant: 'quaternary',
  },
} satisfies Record<string, Omit<StatsCard, 'value'>>;
