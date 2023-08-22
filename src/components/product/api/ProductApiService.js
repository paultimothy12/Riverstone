import { apiClient } from "./ApiClient"

export const getAllProductApi
    = ()=>apiClient.get(`/api/get/AllProduct`)

export const getSpecificProductApi
    = (inputValue)=>apiClient.get(`/api/get/SpecificProduct/${inputValue}`)
    
export const postNewProductApi
    = (product)=>apiClient.post(`/api/post/NewProduct`,product)

export const putUpdateProductApi
    = (product)=>apiClient.put(`/api/put/UpdateProduct`,product)    
    
export const deleteProductApi
    = (id)=>apiClient.delete(`/api/delete/DeleteProduct/${id}`)
