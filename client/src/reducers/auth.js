import { LOGIN, LOGOUT, GETUSER, ENDLOADING, LOADING } from "../constants";
export default (state = { profile: null, loading: false }, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case ENDLOADING:
      return { ...state, loading: false };
    case LOGIN:
      localStorage.setItem("profile", JSON.stringify(action.payload));
      return { ...state, profile: action.payload };
    case LOGOUT:
      localStorage.removeItem("profile");
      return state;
    case GETUSER:
      return { ...state, profile: action.payload };
    default:
      return state;
  }
};
