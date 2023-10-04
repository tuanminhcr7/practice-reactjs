import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';

const TableUsers = (props) => {

    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState(null);

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
    }

    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers]);
    }

    const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res?.data) {
            setListUsers(res?.data);
            setTotalUsers(res?.total);
            setTotalPages(res?.total_pages);
        }
    }

    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEdit(true);
    }

    const handlePageClick = (event) => {
        console.log(">>> event lib: ", event);
        getUsers(+event?.selected + 1);
    }

    useEffect(() => {
        getUsers(1);
    }, []);

    return (
        <>
            <div className='my-3 add-new'>
                <span>List Users:</span>
                <button
                    onClick={() => setIsShowModalAddNew(true)}
                    className='btn btn-success'
                >
                    Add new user
                </button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`users-${index}`}>
                                    <td>{item?.id}</td>
                                    <td>{item?.email}</td>
                                    <td>{item?.first_name}</td>
                                    <td>{item?.last_name}</td>
                                    <td>
                                        <button
                                            className='btn btn-warning'
                                            onClick={() => handleEditUser(item)}
                                        >Edit</button>
                                        <button className='btn btn-danger mx-3'>Delete</button>
                                    </td>
                                </tr>
                            );
                        })
                    }

                </tbody>
            </Table>

            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}

                // class css paginate
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />

            <ModalAddNew
                show={isShowModalAddNew}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
            />
            <ModalEditUser
                show={isShowModalEdit}
                dataUserEdit={dataUserEdit}
                handleClose={handleClose}
            />
        </>
    );
};

export default TableUsers;