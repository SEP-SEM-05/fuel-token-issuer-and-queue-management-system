import axios from "axios";
const url = "http://localhost:5000/"; //local host server URL

let baseApi = "/";
const refreshToken = localStorage.getItem("_RT");
const accessToken = sessionStorage.getItem("_AT");

if (url) {
  baseApi = axios.create({
    baseURL: url,
    headers: {
      "x-refresh-token": refreshToken ? "Bearer " + refreshToken : undefined,
      "x-access-token": accessToken ? "Bearer " + accessToken : undefined,
    },
  });
}

export default baseApi;
