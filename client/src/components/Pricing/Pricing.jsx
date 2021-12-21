import React, { useEffect } from 'react'
import {Container,Grid , Paper,Card,CardActionArea,CardContent, Typography ,Button } from "@material-ui/core"
import { useDispatch, useSelector } from 'react-redux'
import { getPlans } from '../../actions/plans'
import Loading from '../Loading/Loading'
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import { useNavigate } from 'react-router-dom'
import "./style.css"
import { getUser } from '../../actions/auth'

export default function Pricing() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = localStorage.getItem("profile")
    useEffect(()=>{
        dispatch(getPlans())
    },[dispatch])

    useEffect(()=>{
        if (user){
            dispatch(getUser(JSON.parse(user).userId))
        }
    },[dispatch])

    const back = ()=>{
        navigate('/')
    }

    const {plans,loading} = useSelector((state)=> state.plans)
    const auth = useSelector((state)=> state.auth)
    
    if (loading || auth.loading){
        return <>
            <Loading/>
        </>
    }
    
    const showPlan = (userPlan,plan)=>{
        if (userPlan){
            if (userPlan.plan){
                if (userPlan.plan.plan_no < plan.plan_no){
                    return "Upgrade"
                }else if(userPlan.plan.plan_no > plan.plan_no){
                    return "-"
                }else if(userPlan.plan.plan_no = plan.plan_no){
                    return "Current"
                }
            }
        }else if(plan.plan_no == 0){
            return "-"
        }else{
            return "Upgrade"
        }
    }
    
    return (
        <Container maxWidth="md">
            <Typography variant='h3' style={{textAlign:"center",padding:"1em"}}>Choose Your Plan</Typography>
            <Grid container spacing={2} >
                {plans.map((plan,key)=>(
                    <Grid item lg={3} key={key} >
                    <Paper>
                        <Card className="card" style={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                            <div className={"color color"+plan.plan_no}></div> 
                            <CardContent>
                            <Typography variant='h5' style={{textAlign:"center",padding:"0.5rem"}}>{plan.name}</Typography>
                            <Typography variant='body1' style={{textAlign:"left"}}>Price : {plan.price}/mot</Typography>
                            <Typography variant='body2' style={{textAlign:"left",marginTop:"0.1rem"}}>{plan.detail}</Typography>
                            </CardContent>
                            <CardActionArea style={{display:"flex",justifyContent:"center"}}>
                                <Typography variant='h6' style={{padding:"0.3rem"}}>{showPlan(auth.profile,plan)}</Typography>
                            </CardActionArea>
                        </Card>
                    </Paper>
                    </Grid>
                ))}
                    
                
            </Grid>
            <Button style={{margin:"1rem 0"}} onClick={back}><ArrowBackIcon/> Back</Button>
        </Container>
    )
}
