import axios from "../../../API/axiosSetup";

const fetchAllGenre = (page, limit) => {
  return axios.get(`api/v1/genre?page=${page}&limit=${limit}`);
};

const getGenreOption = () => {
  return axios.get(`api/v1/genre/option`);
};

const createNewGenre = (name, description, icon) => {
  const data = new FormData();

  data.append("name", name);
  data.append("description", description);
  data.append("icon", icon);

  return axios.post("/api/v1/genre/create", data);
};

const getGenreWithId = (genreId) => {
  return axios.get(`/api/v1/genre/${genreId}`);
};

const updateGenre = (genreId, name, description, icon) => {
  const data = new FormData();

  data.append("name", name);
  data.append("description", description);
  data.append("icon", icon);

  return axios.put(`/api/v1/genre/update/${genreId}`, data);
};

const deleteGenre = (genreId) => {
  return axios.delete(`/api/v1/genre/delete/${genreId}`);
};

export {
  fetchAllGenre,
  getGenreOption,
  createNewGenre,
  getGenreWithId,
  updateGenre,
  deleteGenre,
};
