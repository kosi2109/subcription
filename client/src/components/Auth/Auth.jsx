import React, { useEffect, useState } from 'react'
import { Container, Paper, TextField, Typography ,Button  } from '@material-ui/core'
import {useStyle} from "./style"
import { useDispatch, useSelector } from 'react-redux'
import { login , signUp } from '../../actions/auth'
import {useNavigate} from "react-router-dom"
export default function Auth() {
    const classes = useStyle()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [form,setForm] = useState({userName:"",fullName:"",password:"",comfirmPassword:""})
    const [signup,setSignup] = useState(false)
    const {profile,error} = useSelector((state)=> state.auth )
    
    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    
    const handleSubmit = (e)=>{
        e.preventDefault();
        const {userName,password} = form
    
        if (!signup){
            dispatch(login({userName,password},navigate))
        }else{
            const {fullName} = form
            dispatch(signUp({userName,fullName,password}))
        }
        
    }

    return (
        <Container maxWidth="sm" className={classes.container}>
            <Paper className={classes.paper}>
                <form onSubmit={handleSubmit}>
                <Typography variant='h4' className={classes.typography}>{signup ? "Signup" : "Login" }</Typography>
                {signup && <TextField onChange={handleChange} name='fullName' className={classes.margin} label="Fullname" variant="outlined" value={form.fullName} fullWidth /> }
                <TextField onChange={handleChange} name='userName' className={classes.margin} label="Username" variant="outlined" fullWidth value={form.userName} />
                <TextField onChange={handleChange} type="password" name='password' className={classes.margin} label="Password" variant="outlined" fullWidth value={form.password} />
                <Button variant="contained" color="primary" type="submit" >{signup ? "Signup" : "Login" }</Button>
                
                </form>
                <Typography variant='body2' style={{margin:"1rem 0",userSelect:"none",cursor:"pointer"}} onClick={()=> setSignup(!signup)} >{signup ? "Do You Already Have An Account ? Login ." : "You Don't have an account ? Signup ." }</Typography>
                {error &&
                    <div className={classes.error}>
                        <Typography variant='body2'>{error.error}</Typography>
                    </div>
                }

                {profile &&
                    <div className={classes.success}>
                        <Typography variant='body2'>Account was Created successfully.Log In </Typography>
                    </div>
                }
                
            </Paper>
        </Container>
    )
}
