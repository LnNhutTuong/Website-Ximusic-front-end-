import axios from "../setup/axios";

const registerNewUser = (email, password, phone, username) => {
  return axios.post("api/v1/register", {
    email: email,
    password: password,
    phone: phone,
    username: username,
  });
};

const handleLogin = (valueLogin, password) => {
  return axios.post("api/v1/login", {
    valueLogin: valueLogin,
    password: password,
  });
};

const getAllGroup = () => {
  return axios.get("api/v1/group/read");
};

const fetchAllUser = (page, limit) => {
  return axios.get(`api/v1/user/read?page=${page}&limit=${limit}`);
};

const handleCreateNewUser = (
  email,
  password,
  username,
  address,
  sex,
  phone,
  groupId,
) => {
  return axios.post("api/v1/user/create", {
    email,
    password,
    username,
    address,
    sex,
    phone,
    groupId,
  });
};

const handleGetUserWithId = (id) => {
  return axios.get(`api/v1/user/read-detail/${id}`);
};

const handleUpdateUser = (
  id,
  email,
  username,
  address,
  sex,
  phone,
  groupId,
) => {
  return axios.put(`api/v1/user/update/${id}`, {
    email,
    username,
    address,
    sex,
    phone,
    groupId,
  });
};

const handleDeleteUser = (id) => {
  return axios.delete(`api/v1/user/delete/${id}`);
};
export {
  registerNewUser,
  handleLogin,
  fetchAllUser,
  handleCreateNewUser,
  getAllGroup,
  handleGetUserWithId,
  handleUpdateUser,
  handleDeleteUser,
};
