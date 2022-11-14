import baseApi from "./@baseURL";
import url from "./urlString";
import axios from "axios";


//organization register
const signUpOrg = async (data) => {

    try {

        let response = await baseApi.post(
            "auth/registerOrg",
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

//organizatioin login
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

// get organization vehicles
const getVehicles = async (id) => {

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
            `org/getVehicles/${id}`
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

// change organization stations
const changeStations = async (data) => {

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

        let response = await api.post(
            `org/changeStations`,
            data
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

//request fuel for an organization
const requestFuel = async (data) => {

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

        let response = await api.post(
            `org/requestFuel`,
            data
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

const getUnreadNotificationCount = async (regNo) => {

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
            `org/notifyCount/${regNo}`
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

//get all notifications
const getNotifications = async (id) => {

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
            `org/notifications/${id}`
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

export { signUpOrg, signInOrg, getDashBoard, getVehicles, changeStations, requestFuel, getUnreadNotificationCount, getNotifications };
