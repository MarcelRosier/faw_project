export type CartItem = {
    productId: number;
    quantity: number;
  };
  
  export type Carts = {
    id: number;
    items: CartItem[];
  };
  
  