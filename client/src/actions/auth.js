import * as api from "../api"
import { LOGIN , LOGOUT,SIGNUP, LOADING, ENDLOADING, GETUSER, AUTH_ERROR, CLOSE } from "../constants"

export const login = (formData,navigate) => async (dispatch)=>{
    try {
        dispatch({type:LOADING})
        const {data} = await api.login(formData)
        dispatch({type:LOGIN,payload:data})
        dispatch({type:ENDLOADING})
        navigate("/")
    } catch (error) {
        if (error.response){
            dispatch({type:AUTH_ERROR,payload:error.response.data.error})
        }
    }
}

export const logout = (formData,navigate=null) => async (dispatch)=>{
    try {
        dispatch({type:LOADING})
        const {data} = await api.logout(formData)
        dispatch({type:LOGOUT,payload:data})
        dispatch({type:ENDLOADING})
        navigate('/')
    } catch (error) {
        console.log(error);
    }
}

export const signUp = (formData) => async (dispatch)=>{
    try {
        dispatch({type:LOADING})
        const {data} = await api.signup(formData)
        dispatch({type:SIGNUP,payload:data})
        dispatch({type:ENDLOADING})
    } catch (error) {
        if (error.response){
            dispatch({type:AUTH_ERROR,payload:error.response.data.error})
        }
    }
}


export const getUserInfo = (id) => async (dispatch)=>{

    try{
        
        dispatch({type:LOADING})
        const {data} = await api.user(id)
        dispatch({type:GETUSER,payload:data})
        dispatch({type:ENDLOADING})
        
    }catch(e){
        if (e.response.status === 401){
            localStorage.removeItem("profile")
        }
        console.log(e.message);
    }
}

export const closePop = ()=> async (dispatch)=>{
    dispatch({type:CLOSE})
}