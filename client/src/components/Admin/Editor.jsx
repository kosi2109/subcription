import React, { useEffect, useState } from 'react'
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core"
import FroalaEditorComponent from 'react-froala-wysiwyg';
import "./style.css"
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from '../../actions/admin';
import { getPlans } from '../../actions/plans';
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';


const config = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
  }
  
export default function Editor() {
    const profile = JSON.parse(localStorage.getItem("profile"))
    const navigate = useNavigate()
    if (!profile?.isAdmin){
        navigate("/")
    }
    const initial = {title:"",intro:"",planId:"",body:""}
    const dispatch = useDispatch()
    const [form , setForm] = useState(initial)

    const inputControl = (editor)=>{
        setForm({
            ...form,
            body:editor
        })
    }
    
    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e)=>{ 
        e.preventDefault()
        dispatch(createBlog(form))
    }

    useEffect(()=>{
        dispatch(getPlans())
        setForm(initial)
    },[dispatch])
    
    const {plans} = useSelector((state)=> state.plans)
    const {loading} = useSelector((state)=> state.admin)

    return (
        loading ? <Loading/> :
        <form onSubmit={handleSubmit} className="form">
            <TextField name='title' label="Title" variant="outlined" fullWidth className="text" onChange={handleChange} />
            <TextField name='intro' label="Intro" variant="outlined" multiline fullWidth className="text" onChange={handleChange} />
            <FormControl variant="outlined" fullWidth className="text">
                <InputLabel id="demo-customized-select-label">Plan</InputLabel>
                <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={form.planId}
                onChange={handleChange}
                name="planId"
                >
                {plans.map((plan,index)=>(
                    <MenuItem value={plan._id} key={index}>{plan.name}</MenuItem>
                ))}
                </Select>
            </FormControl>

            <div id="editor" className="text">
                <FroalaEditorComponent tag='textarea' config={config} model={form.body} onModelChange={inputControl} />
            </div>
            <Button type='submit' variant="contained" color="primary" >Submit</Button>
        </form>
    )
}

