import axiosInstance from "../../utils/axiosInstance";


export const allUsers = async (user, page, searchQuery) => {
    try {
        const params = new URLSearchParams();
        if (searchQuery) {
            params.append('search', searchQuery);
        }
        const res = await axiosInstance.get(`users/admin/${user}/${page}?${params.toString()}`);
        return res;
    } catch (error) {
        console.log(error, "error");
    }
};

export const allCompanyEmployees = async (id, page, searchQuery) => {
    try {
        const params = new URLSearchParams();
        if (searchQuery) {
            params.append('search', searchQuery);
        }
        const res = await axiosInstance.get(`users/company/employees/${id}/${page}?${params.toString()}`);
        return res;
    } catch (error) {
        console.log(error, "error");
    }
};

export const updateUser = async (id, status) => {
    try {
        const res = await axiosInstance.put(`users/admin/${id}/${status}`, {});
        return res;
    } catch (error) {
        console.log(error, "error");
    }

}
