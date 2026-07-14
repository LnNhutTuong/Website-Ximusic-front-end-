import axios from "../../../API/axiosSetup";

const getAllSongs = (page, limit) => {
  return axios.get(`api/v1/song?page=${page}&limit=${limit}`);
};

const createNewSong = (
  title,
  audioUrl,
  cover,
  duration,
  lyrics,
  ownerId,
  featureId,
  genreId,
  albumId,
) => {
  const data = new FormData();

  data.append("title", title);
  data.append("audioUrl", audioUrl);
  data.append("cover", cover);
  data.append("duration", duration);
  data.append("lyrics", lyrics);
  data.append("genreId", genreId);
  data.append("ownerId", ownerId);
  data.append("featureId", featureId);
  data.append("albumId", albumId);

  return axios.post("/api/v1/song/create", data);
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

export { getAllSongs, createNewSong };
