import axios from "axios";
const axiosApiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosApiInstance.interceptors.request.use(
  async (config) => {
    const value = await JSON.parse(localStorage.getItem("token"));
    if (value) {
      config.headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${value}`,
      };
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosApiInstance;
