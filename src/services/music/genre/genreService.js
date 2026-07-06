import axios from "../../../API/axiosSetup";

const fetchAllGenre = (page, limit) => {
  return axios.get(`api/v1/genre?page=${page}&limit=${limit}`);
};

const createNewGenre = (name, description, icon) => {
  const data = new FormData();

  data.append("name", name);
  data.append("description", description);
  data.append("icon", icon);

  return axios.post("/api/v1/genre/create", data);
};

export { fetchAllGenre, createNewGenre };
