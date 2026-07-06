import axios from "../../../API/axiosSetup";

const fetchAllGenre = (page, limit) => {
  return axios.get(`api/v1/genre?page=${page}&limit=${limit}`);
};

export { fetchAllGenre };
