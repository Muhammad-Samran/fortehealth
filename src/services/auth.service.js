import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const register = (payload) => {
  return axios.post(API_URL + "/sign_up", payload);
};

const login = (payload) => {
  return axios.post(API_URL + "/sign_in", payload).then((response) => {
    if (response?.data?.data?.access_token) {
      localStorage.setItem(
        "token",
        JSON.stringify(response?.data?.data?.access_token)
      );
      localStorage.setItem("user", JSON.stringify(response?.data?.data?.user));
    }

    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
