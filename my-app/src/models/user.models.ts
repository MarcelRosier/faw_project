export type User = {    
    id: number
    firstName: string,
    lastName: string,
    email: string,
    password: string,
};

export type UserContext = {    
    user: User,
    setUser: (value: User) => void
};



