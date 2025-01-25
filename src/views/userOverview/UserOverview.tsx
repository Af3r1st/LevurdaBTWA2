import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/navbar/Navbar';
import UserCard from '../../components/UserCard/UserCard';
import { useState, useEffect } from 'react';
import { UserRole } from '../../store/types';
import { IoMdArrowRoundBack } from "react-icons/io";

interface User {
    isSignedIn: boolean;
    userId: number;
    name: string;
    email: string;
    password: string;
    username: string;
    userRole: string;
}

interface EmployeeOverviewProps {
    setShowDashboard: any;
    setShowEmployeeOverview: any;
    setShowUserOverview: any;
}

const UserOverview = (props: EmployeeOverviewProps) => {
    const [userData, setUserData] = useState([] as User[]);

    useEffect(() => {
        const localData = localStorage.getItem('userData');
        if (localData) {
            const parsedData = JSON.parse(localData) as User[];
            setUserData(parsedData);
        } else {
            fetch('/data.json')
                .then((response) => response.json())
                .then((jsonData) => {
                    setUserData(jsonData.auth);
                    localStorage.setItem('userData', JSON.stringify(jsonData.auth));
                });
        }
    }, []);

    const auth = useSelector((state: any) => state.auth);
    const [usersMemory, setUsersMemory] = useState([] as User[]);
    const [users, setUsers] = useState([] as User[]);
    const [searchQuery, setSearchQuery] = useState('');

    const returnToDashboard = () => {
        props.setShowDashboard(true);
        props.setShowEmployeeOverview(false);
        props.setShowUserOverview(false);
    }

    const handleUpdateUser = (id: number, updates: Partial<User>) => {
        const updatedUsers = userData.map((usr) =>
            usr.userId === id ? { ...usr, ...updates } : usr
        );
        setUserData(updatedUsers);
        setUsers(updatedUsers);
        setUsersMemory(updatedUsers);
        localStorage.setItem('userData', JSON.stringify(updatedUsers));
    };

    useEffect(() => {
        setUsers(userData);
        setUsersMemory(userData);
    }, [userData]);

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let standardized = e.target.value.toLowerCase().trim();
        setSearchQuery(standardized);

        if (standardized === '') {
            setUsers(usersMemory);
        }

        let employeesHolder = usersMemory;
        let filtered = employeesHolder.filter((emp) => {
            return emp.name.toLowerCase().includes(standardized)
                || emp.email.toLowerCase().includes(standardized)
                || emp.userRole.toLowerCase().includes(standardized)
                || emp.username.toLowerCase().includes(standardized)
        })

        setUsers(filtered)
    }

    return (
        <>
            <Navbar />
            <div>
                <h1>Users Overview</h1>
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
                <div className='employee-cards' >
                    {
                        users.map(usr => {
                            let key: keyof typeof UserRole = usr.userRole.toUpperCase() as keyof typeof UserRole;

                            return (
                                <div key={usr.userId}>
                                    <UserCard
                                        userId={usr.userId}
                                        name={usr.name}
                                        username={usr.username}
                                        email={usr.email}
                                        userRole={UserRole[key]}
                                        handleUpdateUser={(updates: Partial<User>) => handleUpdateUser(usr.userId, updates)}
                                    />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </>


    );
};

export default UserOverview;