export interface ProductCategory {
  _id?: string;
  name: string;
  slug?: string;
}

export interface Product {
  id: string;
  _id?: string;
  title: string;
  description?: string;
  price: number;
  imageCover: string;
  images?: string[];
  category: ProductCategory;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  quantity?: number;
  brand?: { name: string };
}

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity?: number;
  size?: string;
}

export interface CartItem extends CartProduct {
  quantity: number;
  totalPrice: number;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  ratingsAverage?: number;
  quantity?: number;
}

export interface User {
  id?: string;
  _id?: string;
  name?: string;
  email: string;
  role?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignupDetails extends AuthCredentials {
  name: string;
  rePassword: string;
  phone: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface ApiErrorData {
  message?: string;
  [key: string]: unknown;
}

export interface ApiResponse<T> {
  results?: number;
  data: T;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

export interface WishlistState {
  items: WishlistItem[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export type Theme = "light" | "dark";
