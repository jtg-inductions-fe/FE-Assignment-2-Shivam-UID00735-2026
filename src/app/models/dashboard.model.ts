// Top customer model
export interface TopCustomer {
  image: string;
  name: string;
  email: string;
  amount: number;
}

export interface TopCustomersList {
  restaurantId: number;
  topCustomers: TopCustomer[];
}

// Top selling dishes
export interface TopDishes {
  title: string;
  category: string;
  value: number;
}

export interface TopDishesList {
  restaurantId: number;
  topDishes: TopDishes[];
}

// Active list item
export type OrderStatus = 'pending' | 'Accepted' | 'Rejected' | 'Completed';

export interface ActiveOrders {
  orderId: string;
  restaurant: string;
  customer: string;
  items: string[];
  amount: number;
  status: OrderStatus;
}

export interface ActiveOrdersItems {
  restaurantId: number;
  items: ActiveOrders[];
}
