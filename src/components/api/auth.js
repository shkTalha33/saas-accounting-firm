import axiosInstance from "../../utils/axiosInstance";

export const login = async (data) => {
    try {
        const res = await axiosInstance.post("auth",
            {
                email: data.email,
                password: data?.password,
                type: 'admin'
            },
        );
        return res;
    } catch (error) {
        console.error(error, "error");
        throw error;  // Rethrow the error to be handled by the caller
    }
};
