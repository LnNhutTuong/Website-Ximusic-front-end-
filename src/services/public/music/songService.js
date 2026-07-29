import axios from "../../../API/axiosSetup";

const getAllSongsPublic = (page, limit, genreId, keySearch) => {
  return axios.get("api/v1/song", {
    params: { page, limit, genreId, keySearch },
  });
};

export { getAllSongsPublic };
