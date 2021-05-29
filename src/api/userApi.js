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
    console.log("co vao ");
    return axiosClient.get(url);
  },
  changeProfile: (params) => {
    const url = `users/changeprofile`;
    return axiosClient.post(url, params);
  },
  changePhone: (params) => {
    const url = `users/changephone`;
    return axiosClient.post(url, params);
  },
  changeAvt: (params) => {
    const url = `users/changeavt`;
    return axiosClient.post(url, params);
  },
};

export default userAPi;
