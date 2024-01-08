import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export let refreshTokenData = {
    isExecuting: false,
    promise: null,
};

const authAxiosInstance = axios.create();
export const setSession = async (accessToken: string, refreshToken: string) => {
    if (accessToken) {
        await AsyncStorage.setItem('accessToken', response?.data.data.token);
        if (refreshToken) {
            // localStorage.setItem('refreshToken', refreshToken)
            // await AsyncStorage.setItem('accessToken', response.data.data.token);
        }
        authAxiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        await AsyncStorage.removeItem('accessToken')
        await AsyncStorage.removeItem('refreshToken')
        delete authAxiosInstance.defaults.headers.common.Authorization
    }
}
authAxiosInstance.interceptors.request.use(
    async (conf) => {
        const accessToken = await AsyncStorage.getItem('accessToken')
        if (accessToken) {
            conf.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return conf;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default authAxiosInstance
