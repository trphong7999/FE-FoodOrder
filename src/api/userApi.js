import axiosClient from "./axiosClient";

const managerApi = {
  login: (params) => {
    const url = `/users/login`;
    return axiosClient.post(url, params);
  },
  checkAuth: () => {
    const url = `/users/auth`;
    return axiosClient.post(url);
  },
};

export default managerApi;
