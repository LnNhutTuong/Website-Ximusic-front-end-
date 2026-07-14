import axios from "../../../API/axiosSetup";

const getAlbumOptionWithIdOrNot = (id) => {
  return axios.get(`/api/v1/album/option?id=${id}`);
};

export { getAlbumOptionWithIdOrNot };
