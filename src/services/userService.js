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
    valueLogin: valueLogin,
    password: password,
  });
};

const fetchAllUser = (page, limit) => {
  return axios.get(
    `http://localhost:8080/api/v1/user/read?page=${page}&limit=${limit}`,
  );

  console.log(">>>Check page: ", page);
  console.log(">>>Check limit: ", limit);
};

export { registerNewUser, handleLogin, fetchAllUser };
