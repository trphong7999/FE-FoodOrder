import axiosClient from "./axiosClient";

const merchantApi = {
  login: (params) => {
    const url = `/merchants/login`;
    return axiosClient.post(url, params);
  },
  checkAuth: () => {
    const url = `/merchants/auth`;
    return axiosClient.post(url);
  },
  getAll: () => {
    const url = "/merchants";
    return axiosClient.get(url);
  },

  get: (id) => {
    const url = `/merchants/${id}`;
    return axiosClient.get(url);
  },
  changeCategory: (params) => {
    const url = `/merchants/changecategory`;
    return axiosClient.post(url, params);
  },
  addCategory: (params) => {
    const url = `/merchants/addcategory`;
    return axiosClient.post(url, params);
  },
  removeCategory: (params) => {
    const url = `/merchants/removecategory`;
    return axiosClient.post(url, params);
  },
  foodAdd: (params) => {
    const url = `/merchants/foodadd`;
    return axiosClient.post(url, params);
  },
  foodRemove: (params) => {
    const url = `/merchants/foodremove`;
    return axiosClient.post(url, params);
  },
  foodEdit: (params) => {
    const url = `/merchants/foodedit`;
    return axiosClient.post(url, params);
  },
  addressEdit: (params) => {
    const url = `/merchants/addressedit`;
    return axiosClient.post(url, params);
  },
  getOpenTime: () => {
    const url = `/merchants/getopentime`;
    return axiosClient.post(url);
  },
  updateOpenTime: (params) => {
    const url = `/merchants/updateopentime`;
    return axiosClient.post(url, params);
  },
  //------------------------------------------------
};

export default merchantApi;
