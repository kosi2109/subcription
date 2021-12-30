import React, { useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import {Routes,BrowserRouter,Route, Navigate} from "react-router-dom"
import { getUserInfo } from './actions/auth'
import Auth from './components/Auth/Auth'
import Blogs from './components/Blogs/Blogs'
import Detail from './components/Blogs/Detail/Detail'
import Nav from './components/Nav/Nav'
import NotFound from './components/NotFound/NotFound'
import Pricing from './components/Pricing/Pricing'
import Profile from './components/Profile/Profile'
import Pruchase from './components/Purchase/Pruchase'


export default function App() {
  const dispatch = useDispatch()
  const {profile} = useSelector((state)=> state.auth)
  const user = localStorage.getItem("profile")

  useEffect(()=>{
    if(user){
      dispatch(getUserInfo(JSON.parse(user).userId))
      
    }
  },[])
  
  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route element={<Blogs/>} path="/" />
        <Route element={<Detail/>} path="/b/:id" />
        <Route element={!profile && !user ? <Auth/> :   <Navigate replace to="/"/>} path="/auth" />
        <Route element={<Pricing/>} path="/pricing" />
        <Route element={<Pruchase/>} path="/purchase" />
        <Route element={profile || user ? <Profile/> :   <Navigate replace to="/"/>} path="/profile" />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
