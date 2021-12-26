import React, { useEffect } from 'react'
import {Container,Grid , Paper,Card,CardActionArea,CardContent, Typography ,Button } from "@material-ui/core"
import { useDispatch, useSelector } from 'react-redux'
import { getPlans } from '../../actions/plans'
import Loading from '../Loading/Loading'
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import { useNavigate } from 'react-router-dom'
import "./style.css"
import { selectPlan } from '../../actions/purchase'

export default function Pricing() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = localStorage.getItem("profile")
    useEffect(()=>{
        dispatch(getPlans())
    },[dispatch])

   
    const back = ()=>{
        navigate('/')
    }
    if (user){
        var profile = JSON.parse(user)
    }
    const {plans,loading} = useSelector((state)=> state.plans)
    const purchase = useSelector((state) => state.purchase)
    
    if (loading){
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
            }else{
                if(plan.plan_no == 0){
                    return "-"
                }else{
                    return "Upgrade"    
                }
            }
        }else if(plan.plan_no == 0){
            return "-"
        }else{
            return "Upgrade"
        }
    }

    const select = (e)=>{
        dispatch(selectPlan(e))
        navigate('/purchase',{replace:true})
    }
    
    return (
        <Container maxWidth="md">
            <Typography variant='h3' style={{textAlign:"center",padding:"1em"}}>Choose Your Plan</Typography>
            <Grid container spacing={2} >
                {plans.map((plan,key)=>(
                    <Grid item lg={3} md={4} sm={6} xs={12} key={key} >
                    <Paper>
                        <Card className="card" style={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                            <div className={"color color"+plan.plan_no}></div> 
                            <CardContent>
                            <Typography variant='h5' style={{textAlign:"center",padding:"0.5rem"}}>{plan.name}</Typography>
                            <Typography variant='body1' style={{textAlign:"left"}}>Price : {plan.price}/mot</Typography>
                            <Typography variant='body2' style={{textAlign:"left",marginTop:"0.1rem"}}>{plan.detail}</Typography>
                            </CardContent>
                            <CardActionArea style={{display:"flex",justifyContent:"center"}} onClick={()=> select(plan._id)}>
                                <Typography variant='h6' style={{padding:"0.3rem"}}>{showPlan(profile,plan)}</Typography>
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
