import { IProduct } from "../types/product";
import instance from "./instance";



const user = JSON.parse(localStorage.getItem("user")!)

export const GetAll = () => {
    return instance.get('products')
}

export const Get = (id: string) => {
    return instance.get(`products/${id}`)
}

export const AddProduct = (product: IProduct) => {
    return instance.post('products', product , {
        headers: {
            Authorization: `Bearer ${user.accessToken}`
        }
    })
}

export const EditProduct = (product: IProduct) => {
    return instance.put(`products/${product._id}`, product , {
        headers: {
            Authorization: `Bearer ${user.accessToken}`
        }
    })
}

export const DeleteProduct = (id: string) => {
    
    return instance.delete(`products/${id}`, {
        headers: {
            Authorization: `Bearer ${user.accessToken}`
            
        }
        
    })
}