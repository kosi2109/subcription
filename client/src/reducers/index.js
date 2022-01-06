import { combineReducers } from "redux";
import auth from "./auth"
import blogs from "./blogs"
import blog from "./blog"
import plans from "./plans"
import purchase from "./purchase"
import admin from "./admin"
export const reducers = combineReducers({auth,blogs,blog,plans,purchase,admin})
