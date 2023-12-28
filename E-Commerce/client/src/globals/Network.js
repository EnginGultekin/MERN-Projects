import axios from 'axios';

const baseURL = 'http://localhost:5000'

export const fetchProductList = async () => {
    const { data } = await axios.get(`${baseURL}/product`);
    return data;
}