import * as api from "../api"
import { CREATE_BLOG , LOADING ,ENDLOADING } from "../constants"


export const createBlog = (form) => async (dispatch) =>{
    try {
        dispatch({type:LOADING})
        const {data} = await api.createBlog(form)
        dispatch({type:CREATE_BLOG,payload:data})
        dispatch({type:ENDLOADING})
    } catch (error) {
        
    }
}