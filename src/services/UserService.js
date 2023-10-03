import React from 'react';

import axios from './customize-axios'

const fetchAllUser = () => {
    return axios.get("/api/users");
};

export { fetchAllUser };