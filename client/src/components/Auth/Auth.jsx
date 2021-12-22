import React, { useState } from 'react'
import { Container, Paper, TextField, Typography ,Button } from '@material-ui/core'
import {useStyle} from "./style"
import { useDispatch } from 'react-redux'
import { login } from '../../actions/auth'
import {useNavigate} from "react-router-dom"
export default function Auth() {
    const classes = useStyle()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [form,setForm] = useState({userName:"",password:""})
    const profile = localStorage.getItem("profile")

    if (profile){
        navigate('/')
    }

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(login(form,navigate))
    }
    return (
        <Container maxWidth="sm" className={classes.container}>
            <Paper className={classes.paper}>
                <form onSubmit={handleSubmit}>
                <Typography variant='h4' className={classes.typography}>Login</Typography>
                <TextField onChange={handleChange} name='userName' className={classes.margin} label="Username" variant="outlined" fullWidth />
                <TextField onChange={handleChange} type="password" name='password' className={classes.margin} label="Password" variant="outlined" fullWidth />
                <Button variant="contained" color="primary" type="submit">Login</Button>
                </form>
            </Paper>
        </Container>
    )
}
