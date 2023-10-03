import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { fetchAllUser } from '../services/UserService';

const TableUsers = (props) => {

    const [listUser, setListUser] = useState([]);

    const getUsers = async () => {
        let res = await fetchAllUser();
        if (res && res?.data && res?.data?.data) {
            setListUser(res?.data?.data);
        }
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
        </>
    );
};

export default TableUsers;