import { useState } from 'react';
import './modal.scss';
import { Employee, User } from '../../store/types';
import { MdEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';

interface ModalProps {
    setIsOpen: (isOpen: boolean) => void;
    title: string;
    object: Employee | User | any;
    handleUpdateEmployee?: any;
}

const Modal = (props: ModalProps) => {
    const { setIsOpen, title, object, handleUpdateEmployee } = props;
    const auth = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

    const userRole = auth.userRole;

    const [editedObject, setEditedObject] = useState({ ...object });
    const [isEditing, setIsEditing] = useState(false);

    const isUser = (obj: any): obj is User => {
        return 'userRole' in obj && 'username' in obj && 'email' in obj;
    };

    const handleInputChange = (key: string, value: string) => {
        setEditedObject((prev: any) => ({ ...prev, [key]: value }));
    };

    const saveChanges = () => {
        handleUpdateEmployee(editedObject);
        setIsOpen(false); // Close the modal after saving
    };

    const isAbleToEdit = (key: string) => {
        if (userRole === 'employee') {
            return false;
        }

        if (isUser(object) && (userRole === 'manager' || userRole === 'employee')) {
            return false;
        }


        if (userRole === 'manager') {
            const restrictedKeys = [
                'firstName',
                'lastName',
                'email',
                'userRole',
                'userId',
                'name',
                'username',
            ];
            if (restrictedKeys.includes(key)) {
                return false;
            }
        }

        return true;
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button
                    className="modal-button close-button"
                    onClick={() => setIsOpen(false)}
                >
                    ×
                </button>

                {isEditing ? (
                    <button
                        className="modal-button save-button"
                        onClick={saveChanges}
                    >
                        <FaSave />
                    </button>
                ) : (
                    isAbleToEdit('') && (
                        <button
                            className="modal-button edit-button"
                            onClick={() => setIsEditing(true)}
                        >
                            <MdEdit />
                        </button>
                    )
                )}
                <h1 className="title">{title}</h1>
                <div>
                    {Object.keys(editedObject).map((key) => {
                        if (key === 'handleUpdateEmployee' || key === 'handleUpdateUser') {
                            return null;
                        }

                        if (key === 'id') {
                            return (
                                <p className="modal-row" key={key}>
                                    <span className="modal-title">{key}</span>
                                    <span className="modal-value">{editedObject[key]}</span>
                                </p>
                            );
                        }

                        if (key === 'note' || key === 'id') {
                            return null;
                        }

                        return (
                            <p className="modal-row" key={key}>
                                <span className="modal-title">{key}</span>
                                {isEditing && isAbleToEdit(key) ? (
                                    <input
                                        className="modal-input"
                                        type="text"
                                        value={editedObject[key] || ''}
                                        onChange={(e) => handleInputChange(key, e.target.value)}
                                    />
                                ) : (
                                    <span className="modal-value">{editedObject[key]}</span>
                                )}
                            </p>
                        );
                    })}
                    {editedObject.note && (
                        <p className="modal-row">
                            <span className="modal-title">Note</span>
                            <br />
                            {isEditing && isAbleToEdit('note') ? (
                                <textarea
                                    className="modal-input"
                                    value={editedObject.note || ''}
                                    onChange={(e) => handleInputChange('note', e.target.value)}
                                />
                            ) : (
                                <span className="modal-value">{editedObject.note}</span>
                            )}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
