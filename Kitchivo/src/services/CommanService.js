import baseAPI from "../api/baseApi";
import { authHeader, authHeaderWithImage } from "../helpers/authHeader";
import { toast } from "react-toastify";

const getAuthConfig = () => {
    const headers = authHeader();
    if (headers && Object.keys(headers).length > 0) {
        return { headers };
    }
    return undefined;
};

const getDashboard = async () => {
    try {
        const config = getAuthConfig();
        const res = await baseAPI.get(`dashboard/`, config);
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
};

const getSystemSettings = async () => {
    try {
        const config = getAuthConfig();
        const res = await baseAPI.get(`system-settings/`, config);
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
};

const getWishlist = async () => {
    try {
        const config = getAuthConfig();
        const res = await baseAPI.get(`wishlist/`, config);
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
};


const getProductDetails = async (data) => {
    try {
        const config = getAuthConfig();
        const productId = data?.product_id || data?.id;
        const res = await baseAPI.get(`products/${productId}`, config);
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
};

const getAllProducts = async ({ page, search, category_id, sortBy, priceRange }) => {
    try {
        const config = getAuthConfig();
        const res = await baseAPI.get(
            `products/?page=${page}&search=${search}&category_id=${category_id || ""}&sortBy=${sortBy || ""}&priceRange=${priceRange || ""}`,
            config
        );
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
        throw error;
    }
};

const getAllProductsByCategory = async ({ category_id, page, priceRange, sortBy, search }) => {
    try {
        const config = getAuthConfig();
        const res = await baseAPI.get(
            `product-category/?category_id=${category_id}&page=${page || 1}&search=${search || ""}&sortBy=${sortBy || ""}&priceRange=${priceRange || ""}`,
            config
        );
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
        throw error;
    }
};

const createContact = async (data) => {
    try {
        const formdata = new FormData();
        formdata.append("name", data?.name);
        formdata.append("email", data?.email);
        formdata.append("phone", data?.phone);
        formdata.append("message", data?.message);
        formdata.append("subject", data?.subject);
        const config = getAuthConfig();
        const res = await baseAPI.post(`contact-us/`, formdata, config);
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
};

const createWishlist = async (data) => {
    try {
        const formdata = new FormData();
        formdata.append("product_id", data?.product_id);
        const config = getAuthConfig();
        const res = await baseAPI.post(`wishlist/add/`, formdata, config);
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
};

const submitReview = async (data) => {
    try {
        const formdata = new FormData();
        formdata.append("product_id", data?.product_id);
        formdata.append("rating", data?.rating);
        formdata.append("review", data?.review_text || "");
        const config = getAuthConfig();
        const res = await baseAPI.post(`reviews/add/`, formdata, config);
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
        throw error;
    }
};

const removeWishlist = async (data) => {
    try {
        const formdata = new FormData();
        formdata.append("wishlist_item_id", data?.wishlist_item_id);
        const config = getAuthConfig();
        const res = await baseAPI.post(`wishlist/remove/`, formdata, config);
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
};

const updateUserProfile = async (formdata) => {
    try {
        const config = getAuthConfig();
        const res = await baseAPI.post(`user/profile/`, formdata, config);
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
        throw error;
    }
};

const searchProducts = async (search) => {
    try {
        const config = getAuthConfig();
        const res = await baseAPI.get(`search-products/?search=${encodeURIComponent(search || "")}`, config);
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
        throw error;
    }
};

const CommanServices = {
    getDashboard,
    createContact,
    createWishlist,
    submitReview,
    getAllProducts,
    getAllProductsByCategory,
    getProductDetails,
    getWishlist,
    removeWishlist,
    searchProducts,
    getSystemSettings,
    updateUserProfile,
};

export default CommanServices;