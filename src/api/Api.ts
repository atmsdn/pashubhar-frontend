import axios from 'axios';
import { ENVIRONMENT } from '../shared/constant/environement';
import authAxiosInstance from './AuthAxios';

const SignIn = (requestBody: any) => {
    const url = `${ENVIRONMENT.AUTH_API_URL}auth/otp/init`;
    console.log(url, requestBody)
    return axios.post(url, requestBody);
}
const verifyOTP = (requestBody: any) => {
    const url = `${ENVIRONMENT.AUTH_API_URL}auth/otp/verify`;
    return axios.post(url, requestBody);
}
const createUser = (requestBody: any) => {
    const url = `${ENVIRONMENT.AUTH_API_URL}auth/create-user`;
    return axios.post(url, requestBody);
}
const getCurrentUser = () => {
    const url = `${ENVIRONMENT.AUTH_API_URL}users/get-current-user`;
    return authAxiosInstance.get(url);
}
const getConstantValue = () => {
    const url = `${ENVIRONMENT.AUTH_API_URL}users/get-value`;
    return authAxiosInstance.get(url);
}
const calculateWeight = (requestBody: any) => {
    const url = `${ENVIRONMENT.AUTH_API_URL}users/calculate-value`;
    return authAxiosInstance.post(url, requestBody);
}
export default {
    createUser,
    SignIn,
    verifyOTP,
    getCurrentUser,
    getConstantValue,
    calculateWeight
}