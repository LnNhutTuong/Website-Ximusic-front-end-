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

const createNewAlbum = (title, cover, ownerId, releaseDate, listSongChoose) => {
  const data = new FormData();

  data.append("title", title);
  data.append("cover", cover);
  data.append("ownerId", ownerId);
  data.append("releaseDate", releaseDate);

  listSongChoose.forEach((song) => {
    data.append("songId", song);
  });

  return axios.post(`api/v1/album/create`, data);
};

export {
  getAlbumOptionWithIdOrNot,
  getListAlbum,
  getAlbumWithId,
  createNewAlbum,
};
