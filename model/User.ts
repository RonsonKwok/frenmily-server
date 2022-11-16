export class User {
    id: number;
    username: string;
    password?: string;
    gender: string | null;
    mobile: string | null;
    email: string | null;
    created_at: Date;
    updated_at: Date
}

//------------ adding new models (TBC)-----------------
export interface Cart {
    name: string;
    status: Status;
}


export interface ShoppingList {
    name: string;
    count: string;
    status: Status;
}

export enum Status {
    Active = "active",
    Complete = "complete"
}