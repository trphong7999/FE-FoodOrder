import axiosClient from "./axiosClient";

const managerApi = {
  login: (params) => {
    const url = `/managers/login`;
    return axiosClient.post(url, params);
  },
  checkAuth: () => {
    const url = `/managers/auth`;
    return axiosClient.post(url);
  },
};

export default managerApi;
