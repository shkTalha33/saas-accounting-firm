import axios from "axios";

const GoogleApiKey = "AIzaSyBH0Ey-G2PbWkSCLyGG1A9TCg9LDPlzQpc";

const headers = {
    "Content-Type": "application/json",
};

const headers2 = {
    "Content-Type": "multipart/form-data",
};

const axiosInstance = axios.create({
    baseURL: "https://api.requestservice.com/api/",
    headers,
});

const axiosInstance2 = axios.create({
    baseURL: "https://api.requestservice.com/api/",
    headers: headers2,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('admin_token')
        if (token) {
            config.headers["x-auth-token"] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance2.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('admin_token')
        if (token) {
            config.headers["x-auth-token"] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { headers, headers2, GoogleApiKey, axiosInstance2 };
export default axiosInstance;
