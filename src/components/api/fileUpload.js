import { axiosInstance2 } from "../../utils/axiosInstance";

export const fileUpload = async (data) => {
    try {
        const res = await axiosInstance2.post("image/upload",
            data,
        );
        return res;
    } catch (error) {
        console.error(error, "error");
        throw error;
    }
};