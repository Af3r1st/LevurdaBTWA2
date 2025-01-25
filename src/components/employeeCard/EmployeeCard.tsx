import React from 'react';


import './employeeCard.scss';
import Modal from '../modal/Modal';

interface EmployeeCardProps {
    firstName: string;
    lastName: string;
    hours: number;
    role: string;
    seniority: string;
    note: string | null;
    handleUpdateEmployee: any;
}

const EmployeeCard = (props: EmployeeCardProps) => {
    const [showingModal, setShowingModal] = React.useState(false);

    const showModalEmployee = () => {
        setShowingModal(true);
    };

    return (
        <>
            {showingModal ? (
                <Modal
                    title={`${props.firstName} ${props.lastName}`}
                    setIsOpen={setShowingModal}
                    object={props}
                    handleUpdateEmployee={props.handleUpdateEmployee}
                />
            ) : null}
            <div className="employeeCard" onClick={showModalEmployee}>
                <p className="name-title">
                    {props.firstName} {props.lastName}
                </p>
                <p className="card-row">
                    <span className="card-title">Role:</span>{' '}
                    <span className="card-value">{props.role}</span>
                </p>
                <p className="card-row">
                    <span className="card-title">Seniority:</span>{' '}
                    <span className="card-value">{props.seniority}</span>
                </p>
                <p className="card-row">
                    <span className="card-title">Hours:</span>{' '}
                    <span className="card-value">{props.hours}</span>
                </p>
                <div className="showDetails">
                    <p>Show details</p>
                </div>
            </div>
        </>
    );
};


export default EmployeeCard;