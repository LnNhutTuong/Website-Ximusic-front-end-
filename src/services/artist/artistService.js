import axios from "../../API/axiosSetup";

const getAllArtist = () => {
  return axios.get(`api/v1/artist`);
};

const getArtistOption = () => {
  return axios.get(`api/v1/artist/option`);
};

export { getAllArtist, getArtistOption };
