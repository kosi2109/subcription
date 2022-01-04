import { ENDLOADING, GETBLOGS , GETBLOGSBYID, LOADING } from "../constants"
export default (state = {blogs:[],loading:false},action)=>{
    switch(action.type){
        case LOADING:
            return {...state,loading:true}
        case ENDLOADING:
            return {...state,loading:false}
        case GETBLOGS:
            return {...state,blogs:action.payload.data ,currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages}
        default:
            return state
    }
}
                                                                                                                                                                                                                                                                                                                                                                                                                                