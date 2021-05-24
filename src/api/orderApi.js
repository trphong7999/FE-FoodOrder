import axiosClient from "./axiosClient";

const merchantApi = {
  getOrderFindingPartner: () => {
    const url = `/orders/getfindingpartner`;
    return axiosClient.get(url);
  },
  getOrderByStatus: (status) => {
    const url = `/orders/getbystatus?status=${status}`;
    return axiosClient.get(url);
  },
  getOrderByPartner: (id) => {
    const url = `/orders/getbypartner?id=${id}`;
    return axiosClient.get(url);
  },
  getChatData: (id) => {
    const url = `/orders/getchatdata?id=${id}`;
    return axiosClient.get(url);
  },
};

export default merchantApi;
