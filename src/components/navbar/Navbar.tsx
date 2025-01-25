import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './navbar.scss';
import { signOut } from '../../store/actions';

const Navbar: React.FC = () => {
    const auth = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(signOut(auth.userId));
    }

    return (
        <div className='navbar'>
            <div className='navbar-logo'>
                <p>ClickBaiT</p>
            </div>

            <div className='navbar-item'>
                <p>{auth.userRole}</p>
            </div>


            <div className='navbar-item'>
                <button onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;