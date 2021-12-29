import React from 'react'
import { Button, Card, CardActionArea, CardContent, Container, Paper, Typography } from "@material-ui/core"
import { useDispatch } from 'react-redux'
import { logout } from '../../actions/auth'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const profile = JSON.parse(localStorage.getItem("profile")) 
    const logoutHandle = ()=>{
        dispatch(logout(profile.userId,navigate))
    }
    

    return (
        <Container maxWidth="sm" style={{marginTop: "1rem"}}>
            <Paper variant={1}>
                <Card style={{padding:"1em"}}>
                    <CardContent>
                        <Typography variant='h5'>User Name : {profile.userName}</Typography>
                        <Typography variant='h5'>Full Name : {profile.fullName}</Typography>
                        <Typography variant='h5'>Current Plan : {profile.plan ? profile.plan : "Free"}</Typography>
                    </CardContent>
                    <CardActionArea style={{display:"flex",justifyContent:"center"}}>
                        <Button onClick={logoutHandle} >Logout</Button>
                        <Button>Change Password</Button>
                    </CardActionArea>
                </Card>
            </Paper>
        </Container>
    )
}
