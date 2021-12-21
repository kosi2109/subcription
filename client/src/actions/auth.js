import * as api from "../api"
import { LOGIN , LOGOUT,GETUSER, LOADING, ENDLOADING } from "../constants"

export const login = (formData,navigate) => async (dispatch)=>{
    try {
        const {data} = await api.login(formData)
        dispatch({type:LOGIN,payload:data})
        navigate('/')
    } catch (error) {
        console.log(error);
    }
}

export const logout = (formData,navigate) => async (dispatch)=>{
    try {
        
        const {data} = await api.logout(formData)
        dispatch({type:LOGOUT,payload:data})
        navigate('/')
    } catch (error) {
        console.log(error);
    }
}

export const getUser = (id) => async (dispatch)=>{
    try {
        dispatch({type:LOADING})
        const {data} = await api.user(id)
        dispatch({type:GETUSER,payload:data})
        dispatch({type:ENDLOADING})
    } catch (error) {
        console.log(error);
    }
}