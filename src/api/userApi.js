import axiosClient from "./axiosClient";

const userApi = {
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
  checkUniquePhone: (params) => {
    const url = `users/checkuniquephone?phone=${params}`;
    return axiosClient.get(url);
  },
  getPrestige: (userId) => {
    const url = `users/checkprestige?userid=${userId}`;
    return axiosClient.get(url);
  },
  getAllUser: () => {
    const url = `/users/`;
    return axiosClient.get(url);
  },
  getUserById: (id) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },
};

export default userApi;
