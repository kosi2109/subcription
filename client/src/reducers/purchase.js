import {LOADING,ENDLOADING,SELECTPLAN} from "../constants"

export default (state={select:null,loading:false},action)=>{
    switch(action.type){
        case LOADING:
            return {...state,loading:true}
        case ENDLOADING:
            return {...state,loading:false}
        case SELECTPLAN:
            return {...state,select:action.payload}
        default:
            return state
    }
}