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

const getAllGroup = () => {
  return axios.get("http://localhost:8080/api/v1/group/read");
};

const fetchAllUser = (page, limit) => {
  console.log(">>>>>>>>check limit: ", limit);
  return axios.get(
    `http://localhost:8080/api/v1/user/read?page=${page}&limit=${limit}`,
  );
};

const handleCreateNewUser = (
  email,
  password,
  username,
  addres,
  sex,
  phone,
  groupId,
) => {
  return axios.post("http://localhost:8080/api/v1/user/create", {
    email,
    password,
    username,
    addres,
    sex,
    phone,
    groupId,
  });
};

export {
  registerNewUser,
  handleLogin,
  fetchAllUser,
  handleCreateNewUser,
  getAllGroup,
};
