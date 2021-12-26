import { LOGIN, LOGOUT, SIGNUP, ENDLOADING, LOADING, GETUSER } from "../constants";
export default (state = { profile: null, loading: false , error : null }, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case ENDLOADING:
      return { ...state, loading: false };
    case LOGIN:
      const {error} = action.payload
      if (error){
        localStorage.setItem("error", JSON.stringify(action.payload));
        return { ...state, error: action.payload };
      }
      localStorage.setItem("profile", JSON.stringify(action.payload));
      return { ...state, profile: action.payload };
    case SIGNUP:
      if (action.payload.error){
        return { ...state, error: action.payload };
      }
      return { ...state, profile: action.payload };
    case LOGOUT:
      localStorage.removeItem("profile");
      localStorage.removeItem("user");
      return { ...state, profile: null,error:null };
    case GETUSER:
      console.log(action.payload);
      return {...state,profile:action.payload}
    default:
      return state;
  }
};
