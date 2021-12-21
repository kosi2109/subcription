import { ENDLOADING, GETBLOGSBYID, LOADING } from "../constants"
export default (state = {blog:{},loading:false},action)=>{
    switch(action.type){
        case LOADING:
            return {...state,loading:true}
        case ENDLOADING:
            return {...state,loading:false}
        case GETBLOGSBYID:
            return {...state,blog:action.payload}
        default:
            return state
    }
}
