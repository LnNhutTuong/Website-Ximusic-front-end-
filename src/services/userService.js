import axios from "../API/axiosSetup";

const fetchAllUser = (page, limit) => {
  return axios.get(`api/v1/user?page=${page}&limit=${limit}`);
};

const handleCreateNewUser = (
  email,
  password,
  displayName,
  groupId,
  statusVerify,
) => {
  return axios.post("api/v1/user/create", {
    email,
    password,
    displayName,
    groupId,
    statusVerify,
  });
};

const handleGetUserWithId = (id) => {
  return axios.get(`api/v1/user/${id}`);
};

const handleUpdateUser = (
  id,
  email,
  displayName,
  groupId,

  statusVerify,
) => {
  return axios.put(`api/v1/user/update/${id}`, {
    email,
    displayName,
    groupId,
    statusVerify,
  });
};

const handleDeleteUser = (id) => {
  return axios.delete(`api/v1/user/delete/${id}`);
};

const getUserAccount = () => {
  return axios.get("/api/v1/account");
};

export {
  fetchAllUser,
  handleCreateNewUser,
  handleGetUserWithId,
  handleUpdateUser,
  handleDeleteUser,
  getUserAccount,
};
