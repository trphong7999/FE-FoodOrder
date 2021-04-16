import axiosClient from "./axiosClient";

const merchantApi = {
  login: (params) => {
    const url = `/merchants/login`;
    return axiosClient.post(url, params);
  },
  checkAuth: () => {
    const url = `/merchants/auth`;
    return axiosClient.post(url);
  },
  getAll: () => {
    const url = "/merchants";
    return axiosClient.get(url);
  },

  get: (id) => {
    const url = `/merchants/${id}`;
    return axiosClient.get(url);
  },
};

export default merchantApi;
