import baseApi from "./@baseURL";
import url from "./urlString";
import axios from "axios";

//fuel station get start
const getStand = async (data) => {
  try {

      let response = await baseApi.post(
          "auth/getStandStation",
          data
      );
      localStorage.setItem(
          "refreshToken",
          response.headers["x-refresh-token"]
      );
      sessionStorage.setItem(
          "accessToken",
          response.headers["x-access-token"]
      );
      return response.data;
  } catch (err) {
      console.log(err);
      return err.response.data;
  }
};

//fuel station login
const signIn = async (data) => {
    try {

        let response = await baseApi.post(
            "auth/loginStation",
            data
        );
        localStorage.setItem(
            "refreshToken",
            response.headers["x-refresh-token"]
        );
        sessionStorage.setItem(
            "accessToken",
            response.headers["x-access-token"]
        );
        return response.data;
    } catch (err) {
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
            `station/dashboard/${id}`
        )

        if (response.headers["x-access-token"]) {
            sessionStorage.setItem("accessToken", response.headers["x-access-token"]);
        }
        return response.data;
    }
    catch (err) {
        return err.response.data;
    }
}

// add new fuel amount
const addFuelAmount = async (data) => {
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

        let response = await api.post(`station/updateamount`, data);

        if (response.headers["x-access-token"]) {
            sessionStorage.setItem("accessToken", response.headers["x-access-token"]);
        }

        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
}

//get waiting queues
const getWaitingQueues = async (regNo) => {
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

      let response = await api.get(`station/fuelqueues/${regNo}`);
      //console.log(response.data);


        if (response.headers["x-access-token"]) {
            sessionStorage.setItem("accessToken", response.headers["x-access-token"]);
        }

        return response.data;
    } catch (err) {
        return err.response.data;
    }
}

// Announce a fuel queue
const announceFuelQueue = async (data) => {
  console.log(data);
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


    let response = await api.post(`station/announcequeue`, data);

    if (response.headers["x-access-token"]) {
      sessionStorage.setItem("accessToken", response.headers["x-access-token"]);
    }

    return response.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }

}

// get announced fuel queues
const getAnnouncedQueues = async (regNo) => {
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

    let response = await api.get(`station/announcedqueues/${regNo}`);
    //console.log(response.data);

    if (response.headers["x-access-token"]) {
      sessionStorage.setItem("accessToken", response.headers["x-access-token"]);
    }

    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

// update the state of a fuel queue
const updateQueue = async (data) => {
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

    let response = await api.post(`station/updatequeue`, data);

    if (response.headers["x-access-token"]) {
      sessionStorage.setItem("accessToken", response.headers["x-access-token"]);
    }

    return response.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
}

export {
  getStand,
  signIn,
  getDashBoard,
  getWaitingQueues,
  addFuelAmount,
  announceFuelQueue,
  getAnnouncedQueues,
  updateQueue,
};
