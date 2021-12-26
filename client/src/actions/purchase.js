import {SELECTPLAN,LOADING,ENDLOADING} from "../constants"


export const selectPlan = (plan)=> (dispatch)=>{
    try{
        dispatch({type:SELECTPLAN,payload:plan})
    }catch{
        console.log("error while select plan");
    }
}





