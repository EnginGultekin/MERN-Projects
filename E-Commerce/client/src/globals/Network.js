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

export const fetchLogin = async (formData) => {
    const { data } = await axios.post(`${baseURL}/auth/login`, formData);
    return data;
}

export const fetchMe = async () => {
    const { data } = await axios.get(`${baseURL}/auth/me`);
    return data;
}

export const fetchLogout = async () => {
    const { data } = await axios.post(`${baseURL}/auth/logout`,
        {
            refresh_token: localStorage.getItem('refresh-token'),
        }
    );

    return data;
}

// Böle olunca statusCode dönüyor ama öbür şekil gelmiyor
// Çünkü öbür şekil sadece içinden datayı alıyorduk
export const postOrder = async (input) => {
    const data = await axios.post(`${baseURL}/order`, input);
    return data;
}

export const fetchOrders = async () => {
    const data = await axios.get(`${baseURL}/order`);
    return data;
}


export const deleteProduct = async (product_id) => {
    const data = await axios.delete(`${baseURL}/product/${product_id}`);
    return data;
}


export const updateProduct = async (formData, product_id) => {
    const data = await axios.put(`${baseURL}/product/${product_id}`, formData);
    return data
}


export const createProduct = async (formData) => {
    const data = await axios.post(`${baseURL}/product/`, formData);
    return data
}