import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../components/navbar/Navbar';
import './userDetail.scss';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Employee, User } from '../../store/types';
import ManagmentView from '../managmentView/ManagmentView';

interface AuthUser {
    isSignedIn: boolean;
    userId: number;
    name: string;
    email: string;
    password: string;
    userRole: string;
    username: string;
    employees: number[];
}

interface UserDetailProps {
    setShowDashboard: any;
    setShowUserDetail: any;
    setShowUserOverview: any;
}

const UserDetail = (props: UserDetailProps) => {
    const [data, setData] = useState([] as AuthUser[]);
    const [managmentViewShown, setManagmentViewShown] = useState(false);
    const [userData, setUserData] = useState<AuthUser | null>(null);
    const [employeeData, setEmployeeData] = useState<Employee[]>([]);
    const auth = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

    const userRole = auth.userRole;

    const gotoDashboard = () => {
        props.setShowDashboard(true);
        props.setShowUserDetail(false);
        props.setShowUserOverview(false);
    };

    useEffect(() => {
        const localUserData = localStorage.getItem('userData');
        const localEmployeeData = localStorage.getItem('employeeData');

        if (localUserData) {
            const parsedUserData = JSON.parse(localUserData) as AuthUser[];
            setData(parsedUserData);
        }

        if (localEmployeeData) {
            const parsedEmployeeData = JSON.parse(localEmployeeData) as Employee[];
            setEmployeeData(parsedEmployeeData);
        }
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const currentUser = data.find((user) => user.userId === auth.userId);
            setUserData(currentUser || null);
        }

        const localEmployeeData = localStorage.getItem('employeeData');
        if (localEmployeeData) {
            const parsedEmployeeData = JSON.parse(localEmployeeData) as Employee[];
            setEmployeeData(parsedEmployeeData);
        }
    }, [data, auth.userId]);

    const updateManagedEmployees = (updatedEmployees: number[]) => {
        if (!userData) return;

        const updatedUserData = {
            ...userData,
            employees: updatedEmployees,
        };

        // Update the state
        setUserData(updatedUserData);

        // Update local storage
        const updatedData = data.map((user) =>
            user.userId === userData.userId ? updatedUserData : user
        );
        setData(updatedData);
        localStorage.setItem('userData', JSON.stringify(updatedData));
    };

    const hideView = () => {
        setManagmentViewShown(false);
    }

    return (
        <>
            <Navbar />
            <h1>User Detail</h1>
            <div className='return-dashboard'>
                <button onClick={gotoDashboard}>
                    <span className='span-icon'>
                        <IoMdArrowRoundBack />
                    </span>
                    <span className='span-text'>Return to Dashboard</span>
                </button>
            </div>
            <div className='user-detail'>
                {userData ? (
                    <>
                        <h1>{userData.name}</h1>
                        <p>Email: {userData.email}</p>
                        <p>Username: {userData.username}</p>
                        <p>Role: {userData.userRole}</p>
                    </>
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>
            {userData && userData.employees && userData.employees.length > 0 ? (
                <div className='employee-list'>
                    <h2>Managed Employees</h2>
                    {userData.employees.map((employeeId) => {
                        const found = employeeData.find((emp) => emp.id === employeeId);
                        if (!found) {
                            return (
                                <div key={employeeId} className='employee-card error'>
                                    <p>Employee with ID {employeeId} not found.</p>
                                </div>
                            );
                        }
                        return (
                            <div key={found.id} className='employee-card'>
                                <p>{found.firstName} {found.lastName}</p>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className='employee-list'>
                    <p>No employees managed by this user.</p>
                </div>
            )}
            <div>
                {userRole === 'manager' ? <button onClick={() => setManagmentViewShown(true)} className='manage-employee-button'>Adjust Managed Employees</button> : null}
            </div>
            {
                managmentViewShown && userData && userRole === 'manager' ? (
                    <ManagmentView
                        managerId={userData.userId}
                        employeeIds={userData.employees}
                        hideView={() => setManagmentViewShown(false)}
                        updateEmployees={updateManagedEmployees}
                    />
                ) : null
            }
        </>
    );
};

export default UserDetail;
