import React from 'react';

import Modal from '../modal/Modal';

interface UserCardProps {
    userId: number;
    name: string;
    username: string;
    email: string;
    userRole: string;
    handleUpdateUser: any;
}

const UserCard = (props: UserCardProps) => {

    const [showingModal, setShowingModal] = React.useState(false);

    const showModalEmployee = () => {
        setShowingModal(true);
    }

    return (
        <>
            {showingModal ? <Modal title={props.name} setIsOpen={setShowingModal} object={props} handleUpdateEmployee={props.handleUpdateUser}
            /> : null}
            <div className='employeeCard' onClick={showModalEmployee}>
                <p className='name-title'>{props.name}</p>
                <p className='card-row'><span className='card-title'>Username: </span> <span className='card-value'>{props.username}</span></p>
                <p className='card-row'><span className='card-title'>Email: </span> <span className='card-value'>{props.email}</span></p>
                <p className='card-row'><span className='card-title'>Role: </span> <span className='card-value'>{props.userRole}</span></p>

                <div className='showDetails'>
                    <p>Show details</p>
                </div>
            </div>
        </>



    );
};

export default UserCard;