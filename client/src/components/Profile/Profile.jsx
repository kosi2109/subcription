import React from 'react'
import { Button, Card, CardActionArea, CardContent, Container, Paper, Typography } from "@material-ui/core"
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo, logout } from '../../actions/auth'
import { useNavigate } from 'react-router-dom'
import moment from "moment"
import { useEffect } from 'react'

export default function Profile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userFormLocal = JSON.parse(localStorage.getItem("profile"))
    useEffect(()=>{
        dispatch(getUserInfo(userFormLocal.userId))
    },[dispatch])

    const {profile} = useSelector(state => state.auth)

    const logoutHandle = ()=>{
        dispatch(logout(userFormLocal.userId,navigate))
    }
    

    return (
        <Container maxWidth="sm" style={{marginTop: "1rem"}}>
            <Paper variant={1}>
                <Card style={{padding:"1em"}}>
                    <CardContent>
                        <Typography variant='h5'>User Name : {profile.userName}</Typography>
                        <Typography variant='h5'>Full Name : {profile.fullName}</Typography>
                        <Typography variant='h5'>Current Plan : {profile.plan.plan_type ? profile.plan.plan_type.name  : "Free"}</Typography>
                        <Typography variant='h5'>Untail : { profile.plan.expired_in ? moment(profile.plan?.expired_in).format('D/MM/YYYY') : "-"}</Typography>
                    </CardContent>
                    <CardActionArea style={{display:"flex",justifyContent:"center"}}>
                        <Button onClick={logoutHandle} >Logout</Button>
                    </CardActionArea>
                </Card>
            </Paper>
        </Container>
    )
}
