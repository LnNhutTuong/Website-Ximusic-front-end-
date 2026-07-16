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

  genreId.forEach((item) => {
    data.append("genreId", item);
  });

  data.append("ownerId", ownerId);
  data.append("featureId", featureId);
  data.append("albumId", albumId);

  return axios.post("/api/v1/song/create", data);
};

const getSongWithId = (songId) => {
  return axios.get(`/api/v1/song/${songId}`);
};

const songUpdate = (
  songId,
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

  genreId.forEach((item) => {
    data.append("genreId", item);
  });
  data.append("ownerId", ownerId);

  featureId.forEach((item) => {
    data.append("featureId", item);
  });

  data.append("albumId", albumId);

  return axios.put(`/api/v1/song/update/${songId}`, data);
};

const deleteGenre = (genreId) => {
  return axios.delete(`/api/v1/genre/delete/${genreId}`);
};

export { getAllSongs, createNewSong, getSongWithId, songUpdate };
