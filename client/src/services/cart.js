import axiosConfig from '../axiosConfig';

export const apiAddCart = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'POST',
            url: '/api/cart/add',
            data: payload
        })
        resolve(response);
    } catch (error) {
        console.log(error)
        reject(error);
    }
})
//get cart
export const apiGetCart = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/cart/${id}`,
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
})
//update cart
export const apiUpdateCart = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'PUT',
            url: "/api/cart/update",
            data: payload
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
})
//delete 1 món 
export const apiDeleteCart = (customerID,foodID) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'DELETE',
            url: `/api/cart/${customerID}/${foodID}`,
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
})
//delete all
export const apiDeleteAllCart = (customerID) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'DELETE',
            url: `/api/cart/${customerID}`,
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
})