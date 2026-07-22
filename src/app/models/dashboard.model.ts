// Top customer model
export interface TopCustomer {
  image: string;
  name: string;
  email: string;
  amount: string;
}

export interface TopCustomersList {
  restaurantId: number;
  topCustomers: TopCustomer[];
}

// Top selling dishes
export interface TopDishes {
  title: string;
  value: string;
}

export interface TopDishesList {
  restaurantId: number;
  topDishes: TopDishes[];
}
