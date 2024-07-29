import axios from 'axios';

const baseURL = 'http://localhost:5000'

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