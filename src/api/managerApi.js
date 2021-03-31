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
  registerMerchant: (merchantObj) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const url = `merchants/register`;
    return axiosClient.post(url, merchantObj);
  },
};

export default managerApi;
