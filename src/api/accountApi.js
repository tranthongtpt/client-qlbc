import axiosClient from "./axiosClient";

const accountApi = {
    get: (params) => {
        const url = 'api/v1/user/login';
        return axiosClient.get(url, {
            params
        });
    },
}

export default accountApi;