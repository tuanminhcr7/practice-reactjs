import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { postCreateUser } from '../services/UserService';
import { toast } from 'react-toastify';

const ModalAddNew = (props) => {
    const { handleClose, show, handleUpdateTable, dataUserEdit } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const handleEditUser = () => {

    }

    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name);
        }
    }, [dataUserEdit])

    console.log(">>> data user: ", dataUserEdit);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Job</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={job}
                                    onChange={(e) => setJob(e.target.value)}
                                />
                            </div>
                        </form>


                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditUser}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalAddNew;