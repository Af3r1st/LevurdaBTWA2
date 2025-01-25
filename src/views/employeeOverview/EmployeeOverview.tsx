import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/navbar/Navbar';
import EmployeeCard from '../../components/employeeCard/EmployeeCard';
import './employeeOverview.scss';
import { IoMdArrowRoundBack } from "react-icons/io";


interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    hours: number;
    role: string;
    seniority: string;
    note: string | null;
}

interface EmployeeOverviewProps {
    setShowDashboard: any;
    setShowEmployeeOverview: any;
    setShowUserOverview: any;
}

const EmployeeOverview = (props: EmployeeOverviewProps) => {
    const [employeeData, setEmployeeData] = useState([] as Employee[]);
    const [employeesMemory, setEmployeesMemory] = useState([] as Employee[]);
    const [employees, setEmployees] = useState([] as Employee[]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const localData = localStorage.getItem('employeeData');
        if (localData) {
            const parsedData = JSON.parse(localData) as Employee[];
            setEmployeeData(parsedData);
        } else {
            fetch('/data.json')
                .then((response) => response.json())
                .then((jsonData) => {
                    setEmployeeData(jsonData.employees);
                    localStorage.setItem('employeeData', JSON.stringify(jsonData.employees));
                });
        }
    }, []);

    const returnToDashboard = () => {
        props.setShowDashboard(true);
        props.setShowEmployeeOverview(false);
        props.setShowUserOverview(false);
    }


    useEffect(() => {
        setEmployees(employeeData);
        setEmployeesMemory(employeeData);
    }, [employeeData]);

    const handleUpdateEmployee = (id: number, updates: Partial<Employee>) => {
        const updatedEmployees = employeeData.map((emp) =>
            emp.id === id ? { ...emp, ...updates } : emp
        );
        setEmployeeData(updatedEmployees);
        setEmployees(updatedEmployees);
        setEmployeesMemory(updatedEmployees);
        localStorage.setItem('employeeData', JSON.stringify(updatedEmployees));
    };

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let standardized = e.target.value.toLowerCase().trim();
        setSearchQuery(standardized);

        if (standardized === '') {
            setEmployees(employeesMemory);
        }

        let employeesHolder = employeesMemory;
        let filtered = employeesHolder.filter((emp) => {
            return emp.firstName.toLowerCase().includes(standardized)
                || emp.lastName.toLowerCase().includes(standardized)
                || emp.role.toLowerCase().includes(standardized)
                || emp.seniority.toLowerCase().includes(standardized)
        })

        setEmployees(filtered)
    }


    return (
        <>
            <Navbar />
            <div>
                <h1>Employee Overview</h1>
                <div className='return-dashboard'>
                    <button onClick={returnToDashboard}>     
                    <span className='span-icon'>
                        <IoMdArrowRoundBack />
                    </span>
                    <span className='span-text'>
                            Return to Dashboard
                    </span>
                </button>
                </div>
                <div className='searchbar'>
                    <input id='searchInput' onChange={handleSearchInput} type="text" placeholder='Search...' />
                </div>
                <div className="employee-cards">
                    {employees.map((emp) => (
                        <EmployeeCard
                            key={emp.id}
                            firstName={emp.firstName}
                            lastName={emp.lastName}
                            hours={emp.hours}
                            role={emp.role}
                            seniority={emp.seniority}
                            note={emp.note}
                            handleUpdateEmployee={(updates: Partial<Employee>) =>
                                handleUpdateEmployee(emp.id, updates)
                            }
                        />
                    ))}
                </div>
            </div>
        </>
    );
};


export default EmployeeOverview;
