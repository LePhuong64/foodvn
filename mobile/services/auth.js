import axiosConfig from '../store/axiosConfig'

export const apiLogin = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'POST',
            url: '/api/auth/login',
            data: payload
        })
        resolve(response);
    } catch (error) {
        // console.error("API error:", error);
        reject(error);
    }
})
