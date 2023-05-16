import { Cart, User, CartItem } from "./models/user.models";

export const API_HOST: string = "http://localhost:4040"
export const INITIAL_USER_STATE: User = {
    id: -1,
    firstName: "-",
    lastName: "-",
    email: "-",
    password: "-",
  };
export const INITIAL_CART_STATE: Cart = {
    userId: -1,
    items: Array<CartItem>(),
  };