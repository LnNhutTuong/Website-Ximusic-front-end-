import axios from "../../../API/axiosSetup";

const getAlbumOptionWithIdOrNot = (id) => {
  return axios.get(`/api/v1/album/option?id=${id}`);
};

const getListAlbum = () => {
  return axios.get("api/v1/album");
};

const getAlbumWithId = (albumId) => {
  return axios.get(`api/v1/album/${albumId}`);
};

export { getAlbumOptionWithIdOrNot, getListAlbum, getAlbumWithId };
