import axios from "axios";

const registerUser = (email, phone, password, username) => {
    return axios.post("http://localhost:8080/api/v1/register", { email, phone, password, username });
};

const loginUser = (emailOrPhone, password) => {
    return axios.post("http://localhost:8080/api/v1/login", { emailOrPhone, password });
};

const fetchAllUsers = (page, limit) => {
    return axios.get(`http://localhost:8080/api/v1/user/read?page=${page}&limit=${limit}`);
};

const deleteUser = (id) => {
    return axios.delete(`http://localhost:8080/api/v1/user/delete`, { data: { id } });
};

const fetchAllGroups = () => {
    return axios.get(`http://localhost:8080/api/v1/group/read`);
};

const createUser = (data) => {
    return axios.post(`http://localhost:8080/api/v1/user/create`, { ...data });
};

const updateUser = (data) => {
    return axios.put(`http://localhost:8080/api/v1/user/update`, { ...data });
};

export { registerUser, loginUser, fetchAllUsers, deleteUser, fetchAllGroups, createUser, updateUser };