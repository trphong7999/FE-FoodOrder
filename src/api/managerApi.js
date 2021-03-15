import axiosClient from "./axiosClient";

const managerApi = {
  login: (params) => {
    const url = `/managers/login`;
    return axiosClient.post(url, params);
  },
  checkAuth: () => {
    const url = `/managers/isuser`;
    return axiosClient.post(url);
  },
};

export default managerApi;
