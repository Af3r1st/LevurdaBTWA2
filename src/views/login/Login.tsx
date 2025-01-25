import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { signIn } from '../../store/actions';
import './login.scss';
import { UserRole } from '../../store/types';
import { User } from '../../store/types';

const Login: React.FC = () => {
    const dispatch = useDispatch();

    const [data, setData] = useState([] as User[]);
    const users = data;
    const [logging, setLogging] = useState(false);
    const [loggingText, setLoggingText] = useState('Logging in');
    const [errorMessage, setErrorMessage] = useState('');
    const [loggingCount, setLoggingCount] = useState(0);

    const userRoleMap = new Map<string, UserRole>();
    userRoleMap.set('admin', UserRole.ADMIN);
    userRoleMap.set('employee', UserRole.EMPLOYEE);
    userRoleMap.set('manager', UserRole.MANAGER);

    useEffect(() => {
        const localData = localStorage.getItem('userData');
        if (localData) {
            const parsedData = JSON.parse(localData) as User[];
            setData(parsedData);
        } else {
            fetch('/data.json')
                .then((response) => response.json())
                .then((jsonData) => {
                    setData(jsonData.employees);
                    localStorage.setItem('userData', JSON.stringify(jsonData.auth));
                });
        }
    }, []);

    useEffect(() => {
        if (logging) {
            if (loggingCount === 3) {
                setTimeout(() => {
                    setLoggingText('Logging in')
                    setLoggingCount(0)
                }, 400)
            } else {
                setTimeout(() => {
                    setLoggingText(loggingText + '.')
                    setLoggingCount(loggingCount + 1)
                }, 400)
            }

        }
    }, [logging, loggingText])


    const handleLogin = () => {
        setErrorMessage('');

        const username = (document.getElementById('username-input') as HTMLInputElement).value;
        const password = (document.getElementById('password-input') as HTMLInputElement).value;

        setLogging(true);

        users.forEach((user) => {
            if (user.username === username) {
                if (user.password === password) {

                    setTimeout(() => {
                        dispatch(signIn(user.userId, userRoleMap.get(user.userRole) as UserRole));
                    }, 3000);
                } else {
                    setTimeout(() => {
                        setErrorMessage('Log in failed! Incorrect details.')
                        setLoggingCount(0)
                        setLogging(false);
                    }, 4000);
                }
            }
        });

    }


    return (
        <div className='login-card'>
            <h1>ClickBaiT</h1>
            <h1>Log in</h1>

            <div>
                <input id='username-input' type="text" placeholder="Username" />
                <br />
                <input id='password-input' type="password" placeholder="Password" />
                <br />
                <button onClick={handleLogin}>Login</button>
            </div>
            <div className="item-logging-info">
                <p>{logging ? loggingText : ''}</p>
                <p>{errorMessage}</p>
            </div>
        </div>
    );
};

export default Login;