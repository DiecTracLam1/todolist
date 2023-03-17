import axiosClient from "./axiosClient";

const userApi = {
    login(data){
        const url = '/login';
        return axiosClient.post(url,data)
    }
}