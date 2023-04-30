import { IProduct } from "../types/product";
import instance from "./instance";



const user = JSON.parse(localStorage.getItem("user")!)

export const GetAllCategory = () => {
    return instance.get('categories')
}

export const GetCategory = (id: string) => {
    return instance.get(`categories/${id}`)
}

export const AddCategory = (category: IProduct) => {
    return instance.post('categories', category , {
        headers: {
            Authorization: `Bearer ${user.accessToken}`
        }
    })
}

export const EditCategory = (category: IProduct) => {
    return instance.put(`categories/${category._id}`, category , {
        headers: {
            Authorization: `Bearer ${user.accessToken}`
        }
    })
}

export const DeleteCategory = (id: string) => {
    return instance.delete(`categories/${id}`, {
        headers: {
            Authorization: `Bearer ${user.accessToken}`
        }
    })
}