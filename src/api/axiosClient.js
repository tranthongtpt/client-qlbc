import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: 'http://10.220.5.13:8090/',
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

// Thêm một bộ đón chặn request
axios.interceptors.request.use(function (config) {
    // Làm gì đó trước khi request dược gửi đi
    return config;
  }, function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
  });

// Thêm một bộ đón chặn response
axios.interceptors.response.use(function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response;
  }, function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return Promise.reject(error);
  });

export default axiosClient;