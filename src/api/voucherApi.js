import axiosClient from "./axiosClient";

const voucherApi = {
  getAll: () => {
    const url = `/vouchers/`;
    return axiosClient.get(url);
  },
  createVoucher: (params) => {
    const url = `/vouchers/`;
    return axiosClient.post(url, params);
  },
  remove: (params) => {
    const url = `/vouchers/remove`;
    return axiosClient.post(url, params);
  },
  modify: (params) => {
    const url = `/vouchers/modify`;
    return axiosClient.post(url, params);
  },
};

export default voucherApi;
