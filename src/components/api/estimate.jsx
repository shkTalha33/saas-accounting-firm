import axiosInstance from "../../utils/axiosInstance";


export const allEstimates = async (page, searchQuery) => {
    try {
        const params = new URLSearchParams();
        if (searchQuery) {
            params.append('search', searchQuery);
        }
        const res = await axiosInstance.get(`estimate/admin/all/${page}?${params.toString()}`);
        return res;
    } catch (error) {
        console.log(error, "error");
    }
};


export const allContracts = async (type, page, searchQuery) => {
    try {
        const params = new URLSearchParams();
        if (searchQuery) {
            params.append('search', searchQuery);
        }
        const res = await axiosInstance.get(`order/admin/${type}/${page}?${params.toString()}`);
        return res;
    } catch (error) {
        console.log(error, "error");
    }
};
