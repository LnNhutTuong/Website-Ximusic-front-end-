import axios from "axios";

const registerNewUser = (email, password, phone, username) => {
  return axios.post("http://localhost:8080/api/v1/register", {
    email: email,
    password: password,
    phone: phone,
    username: username,
  });
};

const handleLogin = (valueLogin, password) => {
  return axios.post("http://localhost:8080/api/v1/login", {
    valueLogin,
    password,
  });
};

export { registerNewUser, handleLogin };
