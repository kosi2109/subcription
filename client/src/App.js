import React from 'react'
import {Routes,BrowserRouter,Route} from "react-router-dom"
import Auth from './components/Auth/Auth'
import Blogs from './components/Blogs/Blogs'
import Detail from './components/Blogs/Detail/Detail'
import Nav from './components/Nav/Nav'
import NotFound from './components/NotFound/NotFound'
import Pricing from './components/Pricing/Pricing'


export default function App() {
  

  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route element={<Blogs/>} path="/" />
        <Route element={<Detail/>} path="/b/:id" />
        <Route element={<Auth/>} path="/auth" />
        <Route element={<Pricing/>} path="/pricing" />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
