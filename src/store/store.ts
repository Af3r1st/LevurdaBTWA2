import { Employee, Store, UserRole } from "./types";
import { ActionTypes, ADD_EMPLOYEE, EDIT_EMPLOYEE, SET_EMPLOYEES } from "./actions";

import { AuthActionTypes, SIGN_IN, SIGN_OUT } from "./actions";
import { AuthStore } from "./types";

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const INIT_STATE = {
    isSignedIn: false,
    userId: 1,
    userRole: undefined,
};

const authReducer = (state: AuthStore = INIT_STATE, action: AuthActionTypes) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: true, userId: action.payload.id, userRole: action.payload.role };
        case SIGN_OUT:
            return { ...state, isSignedIn: false, userId: action.payload.id, userRole: undefined };
        default:
            return state;
    }
};

const addEmployee = (employees: Employee[], newEmp: Employee): Employee[] => {
    const maxId = employees.reduce((acc, emp) => emp.id > acc ? emp.id : acc, 0);
    newEmp.id = maxId + 1;

    return [...employees, newEmp];
}

const editEmployee = (employees: Employee[], editedEmp: Employee): Employee[] => {
    return employees.map(emp => emp.id === editedEmp.id ? editedEmp : emp);
}

const setEmployees = (employees: Employee[], newEmps: Employee[]): Employee[] => {
    return [...employees, ...newEmps];
}

function employeeReducer(state: Store = {
    employees: [],
    newEmployee: ""
}, action: ActionTypes) {

    switch (action.type) {
        case ADD_EMPLOYEE:
            return {
                ...state,
                employees: addEmployee(state.employees, action.payload.data)
            }
        case EDIT_EMPLOYEE:
            return {
                ...state,
                employees: editEmployee(state.employees, action.payload.data)
            }
        case SET_EMPLOYEES:
            return {
                ...state,
                employees: setEmployees(state.employees, action.payload.data)
            }
        default:
            return state;
    }

}

const rootReducer = combineReducers({
    employee: employeeReducer,
    auth: authReducer,
})

const store = configureStore({ reducer: rootReducer });


export default store;