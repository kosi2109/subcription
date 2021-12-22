import React from 'react'
import { Button, Card, CardActionArea, CardContent, Container, Paper, Typography } from "@material-ui/core"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from '../../actions/auth'
import Loading from '../Loading/Loading'
export default function Profile() {
    
    const profile = JSON.parse(localStorage.getItem("profile")) 

    

    return (
        <Container maxWidth="sm" style={{marginTop: "1rem"}}>
            <Paper variant={1}>
                <Card style={{padding:"1em"}}>
                    <CardContent>
                        <Typography variant='h5'>User Name : {profile.userName}</Typography>
                        <Typography variant='h5'>Full Name : {profile.fullName}</Typography>
                        <Typography variant='h5'>Current Plan : {profile.plan && profile.plan.name}</Typography>
                    </CardContent>
                    <CardActionArea style={{display:"flex",justifyContent:"center"}}>
                        <Button>Logout</Button>
                        <Button>Change Password</Button>
                    </CardActionArea>
                </Card>
            </Paper>
        </Container>
    )
}
