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

//get dashboard info
const getDashBoard = async (fueltype) => {

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
            `admin/dashboard/${fueltype}`
        )

        if(response.headers["x-access-token"]){
            sessionStorage.setItem("accessToken", response.headers["x-access-token"]);
        }
        return response.data;
    } 
    catch (err) {
        // console.log(err);
        return err.response.data;
    }
}

// update fuel quota
const updateFuelQuota = async (data) => {
    try {

        const refreshToken = localStorage.getItem("refreshToken");
        const accessToken = sessionStorage.getItem("accessToken");

        let api = axios.create({
          baseURL: url,
          headers: {
            "x-refresh-token": refreshToken
              ? "Bearer " + refreshToken
              : undefined,
            "x-access-token": accessToken ? "Bearer " + accessToken : undefined,
          },
        });

        let response = await api.post(`admin/updatequota`, data);

        if (response.headers["x-access-token"]) {
            sessionStorage.setItem("accessToken", response.headers["x-access-token"]);
        }

        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
}

//get unregistered station info
const getUnregisteredStation = async () => {

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
            `admin/unregistered`
        )

        if(response.headers["x-access-token"]){
            sessionStorage.setItem("accessToken", response.headers["x-access-token"]);
        }
        return response.data;
    } 
    catch (err) {
        // console.log(err);
        return err.response.data;
    }
}

// register new station
const registerNewStation = async (data) => {
    try {

        const refreshToken = localStorage.getItem("refreshToken");
        const accessToken = sessionStorage.getItem("accessToken");

        let api = axios.create({
          baseURL: url,
          headers: {
            "x-refresh-token": refreshToken
              ? "Bearer " + refreshToken
              : undefined,
            "x-access-token": accessToken ? "Bearer " + accessToken : undefined,
          },
        });

        let response = await api.post(`admin/registerstation`, data);

        if (response.headers["x-access-token"]) {
            sessionStorage.setItem("accessToken", response.headers["x-access-token"]);
        }

        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
}

// register all new station
const registerAllNewStation = async (data) => {
    try {

        const refreshToken = localStorage.getItem("refreshToken");
        const accessToken = sessionStorage.getItem("accessToken");

        let api = axios.create({
          baseURL: url,
          headers: {
            "x-refresh-token": refreshToken
              ? "Bearer " + refreshToken
              : undefined,
            "x-access-token": accessToken ? "Bearer " + accessToken : undefined,
          },
        });

        let response = await api.post(`admin/registerallstation`);

        if (response.headers["x-access-token"]) {
            sessionStorage.setItem("accessToken", response.headers["x-access-token"]);
        }

        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
}

//get newly registered station info
const getNewlyregisteredStation = async () => {

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
            `admin/newlyregistered`
        )

        if(response.headers["x-access-token"]){
            sessionStorage.setItem("accessToken", response.headers["x-access-token"]);
        }
        return response.data;
    } 
    catch (err) {
        // console.log(err);
        return err.response.data;
    }
}

//get count of each registered station type
const getRegisteredStationCount = async (stationType) => {

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
            `admin/count/${stationType}`
        )

        if(response.headers["x-access-token"]){
            sessionStorage.setItem("accessToken", response.headers["x-access-token"]);
        }
        return response.data;
    } 
    catch (err) {
        // console.log(err);
        return err.response.data;
    }
}

//send email to station
const sendEmail = async (data) => {
    try {

        const refreshToken = localStorage.getItem("refreshToken");
        const accessToken = sessionStorage.getItem("accessToken");

        let api = axios.create({
          baseURL: url,
          headers: {
            "x-refresh-token": refreshToken
              ? "Bearer " + refreshToken
              : undefined,
            "x-access-token": accessToken ? "Bearer " + accessToken : undefined,
          },
        });

        let response = await api.post(`admin/sendemail`, data);

        if (response.headers["x-access-token"]) {
            sessionStorage.setItem("accessToken", response.headers["x-access-token"]);
        }

        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
}

//send email to many stations
const sendManyEmail = async (data) => {
    try {

        const refreshToken = localStorage.getItem("refreshToken");
        const accessToken = sessionStorage.getItem("accessToken");

        let api = axios.create({
          baseURL: url,
          headers: {
            "x-refresh-token": refreshToken
              ? "Bearer " + refreshToken
              : undefined,
            "x-access-token": accessToken ? "Bearer " + accessToken : undefined,
          },
        });

        let response = await api.post(`admin/sendmanyemail`, data);

        if (response.headers["x-access-token"]) {
            sessionStorage.setItem("accessToken", response.headers["x-access-token"]);
        }

        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
}

//get count of each type of personal vehicle
const getPerVehicleCount = async () => {

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
            `admin/typepersonalvehicle`
        )

        if(response.headers["x-access-token"]){
            sessionStorage.setItem("accessToken", response.headers["x-access-token"]);
        }
        return response.data;
    } 
    catch (err) {
        // console.log(err);
        return err.response.data;
    }
}

//get count of each type of org vehicle
const getOrgVehicleCount = async () => {

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
            `admin/typeorgvehicle`
        )

        if(response.headers["x-access-token"]){
            sessionStorage.setItem("accessToken", response.headers["x-access-token"]);
        }
        return response.data;
    } 
    catch (err) {
        // console.log(err);
        return err.response.data;
    }
}

export { 
    signInAdmin, 
    getDashBoard, 
    getUnregisteredStation, 
    getRegisteredStationCount, 
    updateFuelQuota,
    getNewlyregisteredStation,
    registerNewStation,
    registerAllNewStation,
    sendEmail,
    sendManyEmail,
    getPerVehicleCount,
    getOrgVehicleCount 
};