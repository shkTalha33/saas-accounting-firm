import axiosInstance from "../../utils/axiosInstance";



export const allfaqs = async (page) => {

    try {
        const res = await axiosInstance.get(`faq/admin/${page}`)
        return res;
    } catch (error) {
        console.log(error, "error");
    }
}

export const createFaq = async ({ data }) => {
    try {
        const res = await axiosInstance.post(`faq/create`,
            data);
        return res;
    } catch (error) {
        console.error(error, "error");
        throw error;  // Rethrow the error to be handled by the caller
    }
};

export const editFaq = async ({ data }, id) => {
    try {
        const res = await axiosInstance.put(`faq/edit/${id}`,
            data);
        return res;
    } catch (error) {
        console.error(error, "error");
        throw error;  // Rethrow the error to be handled by the caller
    }
};

export const deleteFaq = async (id) => {
    try {
        const res = await axiosInstance.delete(`faq/${id}`);
        return res;
    } catch (error) {
        console.error(error, "error");
        throw error;  // Rethrow the error to be handled by the caller
    }
};    
