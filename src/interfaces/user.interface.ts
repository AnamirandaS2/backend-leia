export interface LoginInfos {
    email: string;
    password: string;
}

export interface SimpleUser extends LoginInfos {
    name: string;
}