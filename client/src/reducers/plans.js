import { ENDLOADING, LOADING,GETPLANS } from "../constants"
export default (state = {plans:[],loading:false},action)=>{
    switch(action.type){
        case LOADING:
            return {...state,loading:true}
        case ENDLOADING:
            return {...state,loading:false}
        case GETPLANS:
            return {...state,plans:action.payload}
        default:
            return state
    }
}
                                                                                                                                                                                                                                                                                                                                                                                                                                