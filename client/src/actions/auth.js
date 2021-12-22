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
