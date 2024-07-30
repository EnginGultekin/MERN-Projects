import axios from 'axios';

const baseURL = 'http://localhost:5000';

axios.interceptors.request.use(
    function (config) {
        const { origin } = new URL(config.url);

        const allowedorigins = [baseURL];
        const token = localStorage.getItem('access-token');
        if (allowedorigins.includes(origin)) {
            config.headers.Authorization = token;
        }
        return config;
    },

    function (error) {
        return Promise.reject(error);
    }
)

export const fetchProductList = async ({ pageParam = 0 }) => {
    const { data } = await axios.get(`${baseURL}/product?page=${pageParam}`);
    return data;
}

export const fetchProduct = async (id) => {
    const { data } = await axios.get(`${baseURL}/product/${id}`);
    return data;
}

export const fetchRegister = async (formData) => {
    const { data } = await axios.post(`${baseURL}/auth/register`, formData);
    return data;
}

export const fetchMe = async () => {
    const { data } = await axios.get(`${baseURL}/auth/me`);
    return data;
}