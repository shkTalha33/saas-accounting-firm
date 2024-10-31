import axiosInstance from "../../utils/axiosInstance";


export const createCategory = async ({ data }, cat) => {
    try {
        const res = await axiosInstance.post(`${cat}/create`,
            data,
        );
        return res;
    } catch (error) {
        console.error(error, "error");
        throw error;  // Rethrow the error to be handled by the caller
    }
};

export const editCategory = async ({ data }, cat, id) => {
    try {
        const res = await axiosInstance.put(`${cat}/edit/${id}`,
            data,
        );
        return res;
    } catch (error) {
        console.error(error, "error");
        throw error;  // Rethrow the error to be handled by the caller
    }
};

export const allCategories = async (cat, page) => {

    try {
        const res = await axiosInstance.get(`${cat}/admin/${page}`);
        return res;
    } catch (error) {
        console.log(error, "error");
    }
}
export const categoryWithoutPage = async (type) => {

    try {
        const res = await axiosInstance.get(`cat/admin-all/${type}`);
        return res;
    } catch (error) {
        console.log(error, "error");
    }
}

export const updateCategory = async (cat, status, id) => {
    try {
        const res = await axiosInstance.put(`${cat}/${status}/${id}`, {});
        return res;
    } catch (error) {
        console.log(error, "error");
    }

}
