import axiosInstance from "../../utils/axiosInstance";

export const getServices = async (page) => {
    try {
        const res = await axiosInstance.get(`service/admin/all/${page}`);
        return res;
    } catch (error) {
        console.error(error, "error");
        throw error;  // Rethrow the error to be handled by the caller
    }
};