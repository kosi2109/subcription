import axios from "axios"

const BASE_URL = "http://localhost:8000"

const API = axios.create({baseURL:BASE_URL})

API.interceptors.request.use(req=>{
    if (localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    }
    return req
})

// auth
export const signup = (formData) => API.post(`/users/signup`,formData)
export const login = (formData) => API.post(`/users/login`,formData)
export const logout = (formData) => API.post(`/users/logout`,formData)
export const user = (id) => API.get(`/users/${id}`)
export const upgrade = (formData) => API.post(`/users/upgrade`,formData)
// blogs
export const getBlogsById = (id) => API.get(`/blogs/${id}`)
export const getBlogs = (form) => API.get(`/blogs?page=${form.page}&plan=${form.plan}&qrery=${form.title}`)


// plans
export const plans = () => API.get(`/plans`)


// admin
export const createBlog = (form) => API.post(`/blogs`,form)