import axiosClient from "./axiosClient";

const partnerApi = {
  getAll: () => {
    const url = "/partners";
    return axiosClient.get(url);
  },

  get: (id) => {
    const url = `/partners/${id}`;
    return axiosClient.get(url);
  },
  login: (params) => {
    const url = `/partners/login`;
    return axiosClient.post(url, params);
  },
  getProfile: () => {
    const url = `/partners/profile`;
    return axiosClient.get(url);
  },
};

export default partnerApi;
