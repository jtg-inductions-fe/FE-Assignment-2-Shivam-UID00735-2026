export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: 'admin' | 'owner';
  restaurantIds?: number[];
}
