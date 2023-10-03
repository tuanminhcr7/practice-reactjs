import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';

const TableUsers = (props) => {

    const [listUser, setListUser] = useState([]);
    const [total, setTotal] = useState(0);

    const getUsers = async () => {
        let res = await fetchAllUser();
        if (res && res?.data) {
            setListUser(res?.data);
        }
    }

    const handlePageClick = () => {

    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 &&
                        listUser.map((item, index) => {
                            return (
                                <tr key={`users-${index}`}>
                                    <td>{item?.id}</td>
                                    <td>{item?.email}</td>
                                    <td>{item?.first_name}</td>
                                    <td>{item?.last_name}</td>
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
                pageCount={69}
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
        </>
    );
};

export default TableUsers;