import axios from 'axios'

const BaseURL = axios.create({
    baseURL: 'http://localhost:5000',
})

export const login = async (formData) =>
    await BaseURL.post('/users/signin', formData)


export const register = async (formData) =>
    await BaseURL.post('/users/signup', formData)    