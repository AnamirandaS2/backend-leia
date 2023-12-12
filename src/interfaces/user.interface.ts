export interface LoginInfos {
    email: string;
    password: string;
}

export interface SimpleUser extends LoginInfos {
    name: string;
}

export type DataUser = User | Admin | null;

interface Admin {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
    authorityLevel: number;
    createdAt: Date;
    updatedAt: Date;
}

interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
    approved: boolean;
    createdAt: Date;
    updatedAt: Date;
}