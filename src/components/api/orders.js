import axiosInstance from "../../utils/axiosInstance";

export const allOrders = async (page, type) => {

    try {
        const res = await axiosInstance.get(`order/admin/${page}/${type}`);
        return res;
    } catch (error) {
        console.log(error, "error");
    }
}