import axios from "../../../API/axiosSetup";

const fetchAllUser = (page, limit, group, sort, keySearch) => {
  return axios.get(`api/v1/user`, {
    params: { page, limit, group, sort, keySearch },
  });
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

export {
  fetchAllUser,
  handleCreateNewUser,
  handleGetUserWithId,
  handleUpdateUser,
  handleDeleteUser,
};
