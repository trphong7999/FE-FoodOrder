import axiosClient from "./axiosClient";

const merchantApi = {
  getOrderByStatus: (status) => {
    const url = `/orders/getbystatus?status=${status}`;
    return axiosClient.get(url);
  },
};

export default merchantApi;
