import axios from "../../../API/axiosSetup";

const fetchAllGenre = (page, limit) => {
  return axios.get(`api/v1/genre?page=${page}&limit=${limit}`);
};

const createNewGenre = (name, description, icon) => {
  const formData = new FormData();

  formData.append("name", name);
  formData.append("description", description);
  formData.append("icon", icon);

  return axios.post("/api/v1/genre/create", formData);
};

export { fetchAllGenre, createNewGenre };
