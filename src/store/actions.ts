import { Employee, UserRole } from "./types";

export const ADD_EMPLOYEE = "ADD_EMPLOYEE";
export const EDIT_EMPLOYEE = "EDIT_EMPLOYEE";
export const REMOVE_EMPLOYEE = "REMOVE_EMPLOYEE";
export const SET_EMPLOYEES = "SET_EMPLOYEES";

export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

export type AuthActionTypes = 
    { type: typeof SIGN_IN; payload: { id: number, role: UserRole } } 
|    { type: typeof SIGN_OUT; payload: { id: number } };


export type ActionTypes = 
     { type: typeof ADD_EMPLOYEE; payload: { data: Employee }}  
|    { type: typeof EDIT_EMPLOYEE; payload: { data: Employee }}
|    { type: typeof REMOVE_EMPLOYEE; payload: { id: number }} 
|    { type: typeof SET_EMPLOYEES; payload: { data: Employee[] }};


export const signIn = (id: number, userRole: UserRole): AuthActionTypes => {
    return {
        type: SIGN_IN,
        payload: { id: id, role: userRole}
    }
}

export const signOut = (id: number): AuthActionTypes => {
    return {
        type: SIGN_OUT,
        payload: { id }
    }
}

export const addEmployee = (data: Employee): ActionTypes => {
    return {
        type: ADD_EMPLOYEE,
        payload: { data }
    }
}

export const editEmployee = (data: Employee): ActionTypes => {
    return {
        type: EDIT_EMPLOYEE,
        payload: { data }
    }
}

export const removeEmployee = (id: number): ActionTypes => {
    return {
        type: REMOVE_EMPLOYEE,
        payload: { id }
    }
}

export const setEmployees = (data: Employee[]): ActionTypes => {
    return {
        type: SET_EMPLOYEES,
        payload: { data }
    }
}
