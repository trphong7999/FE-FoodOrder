import axiosClient from "./axiosClient";

const reviewApi = {
  postNewReview: (params) => {
    const url = `/reviews/newreview`;
    return axiosClient.post(url, params);
  },
  getReview: (params) => {
    const url = `/reviews/getreview`;
    return axiosClient.post(url, params);
  },
  getReviewByMerId: (id) => {
    const url = `/reviews/getreviewbymerchantid?id=${id}`;
    return axiosClient.post(url);
  },
};

export default reviewApi;
