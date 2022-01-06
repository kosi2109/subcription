import { LOGIN, LOGOUT, SIGNUP, ENDLOADING, LOADING, GETUSER ,UPGRADE , AUTH_ERROR ,CLOSE ,AUTH_SUCCESS } from "../constants";
export default (state = { profile: null, loading: false , error : null ,success: null }, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case ENDLOADING:
      return { ...state, loading: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
      case AUTH_SUCCESS:
        return { ...state, success: action.payload };
    case CLOSE:
      return { ...state, error: false , success:null };
    case LOGIN:
      localStorage.setItem("profile", JSON.stringify(action.payload));
      return { ...state, profile: action.payload };
    case SIGNUP:
      return { ...state, profile: action.payload };
    case LOGOUT:
      localStorage.removeItem("profile");
      localStorage.removeItem("user");
      return { ...state, profile: null,error:null };
    case GETUSER:
      const user = JSON.parse(localStorage.getItem("profile"))
      if (!action.payload.plan){
        action.payload.plan = "Free"
      }
      const update_user = {...user,plan:action.payload.plan}
      
      localStorage.setItem("profile", JSON.stringify(update_user));
      return {...state,profile:action.payload}
    case UPGRADE:
      const profile = JSON.parse(localStorage.getItem("profile"))
      const upgraded = {...profile,plan:action.payload.plan}
      localStorage.setItem("profile", JSON.stringify(upgraded));
      return { ...state, profile: upgraded};
    default:
      return state;
  }
};
