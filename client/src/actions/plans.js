import * as api from "../api"
import { ENDLOADING, GETPLANS, LOADING } from "../constants"

export const getPlans = () => async (dispatch)=>{
    try {
        dispatch({type:LOADING})
        const {data} = await api.plans()
        dispatch({type:GETPLANS,payload:data})
        dispatch({type:ENDLOADING})
    } catch (error) {
        console.log(error);
    }
}