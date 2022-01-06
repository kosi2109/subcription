import {LOADING,ENDLOADING,CREATE_BLOG} from "../constants"

export default (state={blog:{},loading:false},action)=>{
    switch(action.type){
        case LOADING:
            return {...state,loading:true}
        case ENDLOADING:
            return {...state,loading:false}
        
        case CREATE_BLOG:
            return {...state,blog:action.payload}
        default:
            return state
    }
}