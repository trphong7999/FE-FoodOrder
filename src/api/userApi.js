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
<<<<<<< HEAD
<<<<<<< HEAD
  changeProfile: (params) => {
    const url = `users/changeprofile`;
    return axiosClient.post(url, params);
  },
  changePhone: (params) => {
    const url = `users/changephone`;
    return axiosClient.post(url, params);
  },
=======
>>>>>>> 166f7a186110516ace7274a45ee1e67c456e3f15
=======
>>>>>>> 166f7a186110516ace7274a45ee1e67c456e3f15
};

export default userAPi;
