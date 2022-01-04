import {SELECTPLAN,LOADING,ENDLOADING,UPGRADE, SUCCESS, AUTH_ERROR, AUTH_SUCCESS} from "../constants"
import * as api from "../api"

export const selectPlan = (plan)=> (dispatch)=>{
    try{
        dispatch({type:SELECTPLAN,payload:plan})
    }catch{
        console.log("error while select plan");
    }
}


export const buyPlan = (form,navigate) => async (dispatch)=>{
    
    try {
        
        dispatch({type:LOADING})
        const {data} = await api.upgrade(form)
        dispatch({type:UPGRADE,payload:data})
        dispatch({type:ENDLOADING})
        dispatch({type:AUTH_SUCCESS,payload:data.message})
        navigate("/")
    } catch (error) {
        
        if (error.response){
            dispatch({type:AUTH_ERROR,payload:error.response.data.error})
            dispatch({type:ENDLOADING})
        }
    }
}





