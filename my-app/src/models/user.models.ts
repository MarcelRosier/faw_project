export type User = {    
    id: number
    firstName: string,
    lastName: string,
    email: string,
    password: string,
};

export type CartItem = {    
    productId: number,
    quantity: number
};

export type Cart = {    
    userId: number,
    items: CartItem[]
};
export type ShopContext = {    
    user: User,
    setUser: React.Dispatch<React.SetStateAction<User>>,
    cart: Cart,
    setCart: React.Dispatch<React.SetStateAction<Cart>>,
};



