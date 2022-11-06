import baseApi from "./@baseURL";
import url from "./urlString";
import axios from "axios";

//fuel station login
const signInAdmin = async (data) => {

    try {

        let response = await baseApi.post(
            "auth/loginAdmin",
            data
        );

        localStorage.setItem("refreshToken", response.headers["x-refresh-token"]);
        sessionStorage.setItem("accessToken", response.headers["x-access-token"]);

        return response.data;
    } 
    catch (err) {
        console.log(err);
        return err.response.data;
    }
};

export { signInAdmin };