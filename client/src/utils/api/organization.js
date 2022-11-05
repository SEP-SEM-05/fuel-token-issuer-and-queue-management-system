import baseApi from "./@baseURL";
import url from "./urlString";
import axios from "axios";

//fuel station login
const signInOrg = async (data) => {

    try {

        let response = await baseApi.post(
            "auth/loginOrg",
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

//get dashboard info
const getDashBoard = async (id) => {

    try {
        
        const refreshToken = localStorage.getItem("refreshToken");
        const accessToken = sessionStorage.getItem("accessToken");

        let api = axios.create({
            baseURL: url,
            headers: {
                "x-refresh-token": refreshToken ? "Bearer " + refreshToken : undefined,
                "x-access-token": accessToken ? "Bearer " + accessToken : undefined,
            },
        });

        let response = await api.get(
            `org/dashboard/${id}`
        )

        if(response.headers["x-access-token"]){
            sessionStorage.setItem("accessToken", response.headers["x-access-token"]);
        }
        return response.data;
    } 
    catch (err) {
        console.log(err);
        return err.response.data;
    }
}

export { signInOrg, getDashBoard };
