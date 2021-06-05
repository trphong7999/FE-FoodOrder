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
  getReviewByMerId: (params) => {
    const url = `/reviews/getreviewbyid`;
    return axiosClient.post(url, params);
  },
};

export default reviewApi;
