import axios from "axios";

const registerUser = (email, phone, password, username) => {
    return axios.post("http://localhost:8080/api/v1/register", {
        email, phone, password, username
    });
};

const loginUser = (emailOrPhone, password,) => {
    return axios.post("http://localhost:8080/api/v1/login", {
        emailOrPhone, password
    });
};

export { registerUser, loginUser };