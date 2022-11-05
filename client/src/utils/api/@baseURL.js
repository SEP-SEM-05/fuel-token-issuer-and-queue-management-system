import axios from "axios";
import url from "./urlString";

let baseApi = "/";
const refreshToken = localStorage.getItem("refreshToken");
const accessToken = sessionStorage.getItem("accessToken");

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
