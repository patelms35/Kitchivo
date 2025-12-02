import baseAPI from "../api/baseApi";
import { authHeader, authHeaderWithImage } from "../helpers/authHeader";
import { toast } from "react-toastify";

const registerSendOtp = async (data) => {
    try {
        let formdata = new FormData();
        formdata.append("email", data?.email);
        formdata.append("phone", data?.phone);

        const res = await baseAPI.post(`send-otp/`, formdata);
        console.log("res", res);
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
};

const changePassword = async (data) => {
    try {
        const formdata = new FormData();
        formdata.append("old_password", data?.old_password);
        formdata.append("new_password", data?.new_password);

        const res = await baseAPI.post(`change-password/`, formdata, {
            headers: authHeader(),
        });
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
        throw error;
    }
};

const login = async (data) => {
    try {
        let formdata = new FormData();
        formdata.append("email", data?.email);
        formdata.append("password", data?.password);
        const res = await baseAPI.post(`login/`, formdata);
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
};


const getProfile = async () => {
    try {
        const res = await baseAPI.get(`user/profile/`, { headers: authHeader() });
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
};

const forgotPasswordSendOpt = async (email) => {
    try {
        const formdata = new FormData();
        formdata.append("email", email);

        const res = await baseAPI.post(`forgot-password/`, formdata, {
            headers: authHeader(),
        });
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
};

const forgotPasswordVerifyOpt = async (data) => {
    try {
        const formdata = new FormData();
        formdata.append("email", data?.email);
        formdata.append("otp", data?.otp);

        const res = await baseAPI.post(`reset-password-otp-verify/`, formdata, {
            headers: authHeader(),
        });
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
};

const resetPassword = async (data) => {
    try {
        const formdata = new FormData();
        formdata.append("email", data?.email);
        formdata.append("otp", data?.otp);
        formdata.append("new_password", data?.new_password);

        const res = await baseAPI.post(`reset-password/`, formdata, {
            headers: authHeader(),
        });
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
};

const verifyOtp = async (data) => {
    try {
        const formdata = new FormData();
        formdata.append("email", data.email);
        formdata.append("otp", data.otp);
        formdata.append("name", data?.name);
        formdata.append("email", data?.email);
        formdata.append("password", data?.password);
        formdata.append("phone", data?.phone);

        const res = await baseAPI.post(`verify-otp/`, formdata, {
            headers: authHeader(),
        });
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
};

const resendOtp = async (data) => {
    try {
        const formdata = new FormData();
        formdata.append("email", email);

        const res = await baseAPI.post(`verify-otp/admin`, formdata, {
            headers: authHeader(),
        });
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
};


const AuthServices = {
    login,
    getProfile,
    verifyOtp,
    forgotPasswordSendOpt,
    forgotPasswordVerifyOpt,
    resetPassword,
    resendOtp,
    registerSendOtp,
    changePassword,
};

export default AuthServices;