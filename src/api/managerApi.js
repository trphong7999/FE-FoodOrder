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
    const url = `merchants/register`;
    return axiosClient.post(url, merchantObj);
  },
  registerPartner: (partnerObj) => {
    const url = `partner/register`;
    return axiosClient.post(url, partnerObj);
  },
};

export default managerApi;
