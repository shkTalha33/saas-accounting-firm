import axiosInstance from "../../utils/axiosInstance";

export const getAllSupports = async (page) => {

    try {
        const res = await axiosInstance.get(`support/admin/${page}`);
        return res;
    } catch (error) {
        console.log(error, "error");
    }
}

export const updateSupport = async ({ data }, id) => {
    try {
        const res = await axiosInstance.put(`support/attended/${id}`,
            data,);
        return res;
    } catch (error) {
        console.log(error, "error");
    }

}
