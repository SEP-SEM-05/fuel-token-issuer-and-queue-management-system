import axios from "axios";
const url = "http://localhost:5000/"; //local host server URL

let baseApi = "/";
const refreshToken = localStorage.getItem("refreshToken");
const accessToken = sessionStorage.getItem("accessToken");

// console.log(refreshToken)
// console.log(accessToken)

if (url) {

    // const refreshToken = localStorage.getItem("refreshToken");
    // const accessToken = sessionStorage.getItem("accessToken");

    baseApi = axios.create({
        baseURL: url,
        headers: {
            "x-refresh-token": refreshToken ? "Bearer " + refreshToken : undefined,
            "x-access-token": accessToken ? "Bearer " + accessToken : undefined,
        },
    });

    // baseApi = axios.create({
    //     baseURL: url,
    //     headers: {
    //         "x-refresh-token": localStorage.getItem("refreshToken") ? "Bearer " + localStorage.getItem("refreshToken") : undefined,
    //         "x-access-token": sessionStorage.getItem("accessToken") ? "Bearer " + sessionStorage.getItem("accessToken") : undefined,
    //     },
    // });
}

export default baseApi;
