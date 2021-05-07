import axiosClient from "./axiosClient";

const userAPi = {
  login: (params) => {
    const url = `/users/login`;
    return axiosClient.post(url, params);
  },
  checkAuth: () => {
    const url = `/users/auth`;
    return axiosClient.post(url);
  },
  register: (params) => {
    const url = `/users/signup`;
    return axiosClient.post(url, params);
  },
  getProfile: () => {
    const url = `/users/profile`;
    return axiosClient.get(url);
  },
};

export default userAPi;
