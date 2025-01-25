import React, { useState, useEffect } from 'react';
import { User, Employee } from '../../store/types';
import './managmentView.scss';

interface ManagmentViewProps {
    managerId: number | undefined;
    employeeIds: number[] | undefined;
    hideView: () => void;
    updateEmployees: (updatedEmployees: number[]) => void;
}

const ManagmentView = (props: ManagmentViewProps) => {
    const [employeeData, setEmployeeData] = useState<Employee[]>([]);
    const [newEmployee, setNewEmployee] = useState({
        firstName: '',
        lastName: '',
        hours: '',
        seniority: '',
        role: '',
    });


    useEffect(() => {
        const localData = localStorage.getItem('employeeData');
        if (localData) {
            const parsedData = safeParse(localData, [] as Employee[]);
            if (props.employeeIds) {
                setEmployeeData(
                    parsedData.filter((employee) =>
                        props.employeeIds?.includes(employee.id)
                    )
                );
            }
        }
    }, [props.employeeIds]);

    const safeParse = <T,>(data: string | null, fallback: T): T => {
        try {
            return data ? JSON.parse(data) : fallback;
        } catch {
            return fallback;
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setNewEmployee({ ...newEmployee, [id]: value });
    };

    const addNewEmployee = () => {
        if (
            !newEmployee.firstName ||
            !newEmployee.lastName ||
            !newEmployee.hours ||
            !newEmployee.seniority ||
            !newEmployee.role
        ) {
            console.error('Please fill out all fields');
            return;
        }

        const localData = localStorage.getItem('employeeData');
        const parsedEmployees = safeParse(localData, [] as Employee[]);

        const newEmployeeEntry: Employee = {
            id: Math.max(0, ...parsedEmployees.map((e) => e.id)) + 1, // Ensures a unique ID
            ...newEmployee,
        };

        // Update employee data locally and in localStorage
        const updatedEmployeeData = [...parsedEmployees, newEmployeeEntry];
        localStorage.setItem('employeeData', JSON.stringify(updatedEmployeeData));
        setEmployeeData((prev) => [...prev, newEmployeeEntry]);

        // Update manager data
        if (props.managerId) {
            const localManagerData = localStorage.getItem('userData');
            const parsedManagers = safeParse(localManagerData, [] as User[]);
            const managerIndex = parsedManagers.findIndex(
                (manager) => manager.userId === props.managerId
            );

            if (managerIndex !== -1) {
                parsedManagers[managerIndex].employees = [
                    ...(parsedManagers[managerIndex].employees || []),
                    newEmployeeEntry.id,
                ];
                localStorage.setItem('userData', JSON.stringify(parsedManagers));
            }
        }

        // Update parent component
        props.updateEmployees([...(props.employeeIds || []), newEmployeeEntry.id]);

        // Reset input fields
        setNewEmployee({
            firstName: '',
            lastName: '',
            hours: '',
            seniority: '',
            role: '',
        });
    };

    const removeEmployee = (id: number) => {
        return () => {
            // Update employee data locally and in localStorage
            const updatedEmployeeData = employeeData.filter(
                (employee) => employee.id !== id
            );
            setEmployeeData(updatedEmployeeData);

            const localData = localStorage.getItem('employeeData');
            const parsedEmployees = safeParse(localData, [] as Employee[]);
            const filteredEmployees = parsedEmployees.filter(
                (employee) => employee.id !== id
            );
            localStorage.setItem('employeeData', JSON.stringify(filteredEmployees));

            // Update manager data
            if (props.managerId) {
                const localManagerData = localStorage.getItem('userData');
                const parsedManagers = safeParse(localManagerData, [] as User[]);
                const managerIndex = parsedManagers.findIndex(
                    (manager) => manager.userId === props.managerId
                );

                if (managerIndex !== -1) {
                    parsedManagers[managerIndex].employees = parsedManagers[
                        managerIndex
                    ].employees.filter((employeeId) => employeeId !== id);
                    localStorage.setItem('userData', JSON.stringify(parsedManagers));
                }
            }

            // Update parent component
            const updatedEmployeeIds = (props.employeeIds || []).filter(
                (employeeId) => employeeId !== id
            );
            props.updateEmployees(updatedEmployeeIds);
        };
    };

    return (
        <div className='bigtable-employees'>
            <div className='bigtable-employees-table'>
                <h1>Management</h1>
                <button className="close-button-table" onClick={props.hideView}>×</button>
                <div className='bigtable-employees-table-item'>
                    <div className='bigtable-employees-table-item-cell'>
                        <h2>First name</h2>
                    </div>
                    <div className='bigtable-employees-table-item-cell'>
                        <h2>Last name</h2>
                    </div>
                    <div className='bigtable-employees-table-item-cell'>
                        <h2>Hours</h2>
                    </div>
                    <div className='bigtable-employees-table-item-cell'>
                        <h2>Seniority</h2>
                    </div>
                    <div className='bigtable-employees-table-item-cell'>
                        <h2>Role</h2>
                    </div>
                    <div className='bigtable-employees-table-item-cell'>
                        <h2>Action</h2>
                    </div>
                </div>
                <div className='bigtable-employees-table-item'>
                    <div className='bigtable-employees-table-item-cell'>
                        <input
                            id='firstName'
                            type='text'
                            value={newEmployee.firstName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='bigtable-employees-table-item-cell'>
                        <input
                            id='lastName'
                            type='text'
                            value={newEmployee.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='bigtable-employees-table-item-cell'>
                        <input
                            id='hours'
                            type='text'
                            value={newEmployee.hours}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='bigtable-employees-table-item-cell'>
                        <input
                            id='seniority'
                            type='text'
                            value={newEmployee.seniority}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='bigtable-employees-table-item-cell'>
                        <input
                            id='role'
                            type='text'
                            value={newEmployee.role}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='bigtable-employees-table-item-cell'>
                        <button onClick={addNewEmployee}>Add new employee</button>
                    </div>
                </div>
                {employeeData.map((employee) => (
                    <div
                        key={employee.id}
                        className='bigtable-employees-table-item'
                    >
                        <div className='bigtable-employees-table-item-cell'>
                            {employee.firstName}
                        </div>
                        <div className='bigtable-employees-table-item-cell'>
                            {employee.lastName}
                        </div>
                        <div className='bigtable-employees-table-item-cell'>
                            {employee.hours}
                        </div>
                        <div className='bigtable-employees-table-item-cell'>
                            {employee.seniority}
                        </div>
                        <div className='bigtable-employees-table-item-cell'>
                            {employee.role}
                        </div>
                        <div className='bigtable-employees-table-item-cell'>
                            <button onClick={removeEmployee(employee.id)}>
                                Remove employee
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManagmentView;
