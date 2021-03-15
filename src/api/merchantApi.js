import axiosClient from "./axiosClient";

const merchantApi = {
  getAll: () => {
    const url = "/merchants";
    return axiosClient.get(url);
  },

  get: (id) => {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
};

export default merchantApi;
