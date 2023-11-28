import axios from "axios";
import { storage } from "../service/storage";

const axiosClient = (method, url, data = {}, params = {}, baseURL = "") => {
    const token = storage.getItem("token");
    let headers = !!token
        ? {
              Authorization: "Bearer " + token,
          }
        : {};
    return axios({
        method: method,
        url: url,
        data: data,
        params: params,
        baseURL: baseURL ? baseURL : "http://localhost:8080",
        headers: headers,
    });
};

export default axiosClient;
