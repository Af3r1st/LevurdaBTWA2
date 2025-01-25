export interface Store {
    employees: Employee[];
    newEmployee: string;
}

export interface AuthStore {
    isSignedIn: boolean | null;
    userId: number | null;
    userRole: UserRole | undefined;
}

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    hours: number;
    note: string | undefined;
}

export interface User {
    id: number;
    name: string;
    email: string;
    userRole: UserRole | undefined;
    username: string;
}

export enum UserRole {
    ADMIN = "admin",
    MANAGER = "manager",
    EMPLOYEE = "employee",
}