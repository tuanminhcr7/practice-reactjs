import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';

const TableUsers = (props) => {

    const [listUser, setListUser] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res?.data) {
            setListUser(res?.data);
            setTotalUsers(res?.total);
            setTotalPages(res?.total_pages);
        }
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
        </>
    );
};

export default TableUsers;