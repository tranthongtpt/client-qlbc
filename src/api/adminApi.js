import axiosClient from "./axiosClient";
const userApi = {
    getListReporter: async (params) =>{
        const url = `/admin/manager-user?page=${params?.page}&size=${params?.size}`;
        return await axiosClient.post(url,{params})
    },
    getUser: async (params) =>{
        const url = '/user/data-spokesman';
        return await axiosClient.get(url,{params})
    },
    getInf: async () =>{
        const url = '/user/infomation';
        return await axiosClient.get(url)
    },
    postInf: async () =>{
        const url = '/admin/register-institute';
        return await axiosClient.get(url)
    },
    getJournaList: async (params) =>{
        const url = '/user/data-journalist';
        return await axiosClient.get(url,{params})
    },
    getListUnits: async (params) =>{
        const url = `/admin/manager-institute?page=${params?.page}&size=${params?.size}`;
        return await axiosClient.post(url,{params})
    }
}

export default userApi;


