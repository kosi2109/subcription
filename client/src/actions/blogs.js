import * as api from "../api"
import { ENDLOADING, GETBLOGS,GETBLOGSBYID, LOADING } from "../constants"
import { logout } from "./auth"
export const getBLogs = (page) => async (dispatch)=>{
    try {
        console.log(page);
        dispatch({type:LOADING})
        const {data:{data, currentPage, numberOfPages}} = await api.getBlogs(page)
        dispatch({type:GETBLOGS,payload:{data, currentPage, numberOfPages}})
        dispatch({type:ENDLOADING})
    } catch (error) {
        console.log(error);
    }
}

export const getBlogById = (id,navigate) => async (dispatch)=>{
    try {
        dispatch({type:LOADING})
        const {data} = await api.getBlogsById(id)
        dispatch({type:GETBLOGSBYID,payload:data})
        dispatch({type:ENDLOADING})
    } catch (error) {
        if (error.response.status === 401){
            navigate('/pricing')
        }
        console.log(error.message);
    }
}