import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../actions/auth";
import { getPlans } from "../../actions/plans";
import { useStyles } from "./style";
import Loading from "../Loading/Loading"
import { buyPlan } from "../../actions/purchase";
import { useNavigate } from "react-router-dom";
import Noti from "../Notification/Noti";






export default function Pruchase() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getPlans());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserInfo(JSON.parse(localStorage.getItem('profile')).userId));
  }, [dispatch]);
  const { select } = useSelector((state) => state.purchase);
  const { plans } = useSelector((state) => state.plans);
  const user = useSelector((state)=> state.auth)
  if (!select){
    var initialForm = {
      planName : "",
      planId: "",
      month: 1,
      total: 0,
    };
  }else{
    const price = plans.find((plan) => plan._id == select).price;
    const name = plans.find((plan) => plan._id == select).name;
    var initialForm = {
      planName : name,
      planId: select,
      month: 1,
      total: price,
    };
  }
  
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  

  if (user.loading){
    return <Loading/>
  }

  
  
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  


 

  const caculateTotal = (id,month)=>{
    const price = plans.find((plan) => plan._id == id).price;
    return price * month
  }

  const getPlanName = (id)=>{
    return plans.find((plan) => plan._id == id).name;

  }
  
  console.log(user);
  const canBuy = (plan_no)=>{
      if (user.profile?.plan?.plan_type){
        if (!user.profile.plan.plan_type.plan_no){
          return false
        }
        else if (plan_no <= user.profile.plan.plan_type.plan_no){
          return true
        }else{
          return false
        }
    }
    return false
  }



  const submit = (e)=>{
    e.preventDefault()
    dispatch(buyPlan(form,navigate))
    setOpen(false)
  }

  
 
  return (
    <Container maxWidth="sm">
      
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="demo-simple-select-label">Plan (*)</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={form.planId}
            onChange={(e)=>setForm({...form,planId:e.target.value,total:caculateTotal(e.target.value,form.month),planName:getPlanName(e.target.value)})}
            name="planId"
          
          >
            {plans.map((plan, key) => (
              <MenuItem key={key} value={plan._id} disabled={canBuy(plan.plan_no)} >
                {plan.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="demo-simple-select-label">Month (*)</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={form.month}
            onChange={(e)=>setForm({...form,month: parseInt(e.target.value),total:caculateTotal(form.planId,e.target.value)})}
            name="month"
          >
            
              <MenuItem value="1">
                1 Month
              </MenuItem>
              
              <MenuItem value="3">
                3 Month
              </MenuItem>

              <MenuItem value="6">
                6 Month
              </MenuItem>
              <MenuItem value="12">
                12 Month
              </MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" type="button" onClick={handleClickOpen} >Upgrade</Button>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Comfirm Check"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure to buy {form.planName} Plan for {form.month} month(s) .
          </DialogContentText>
        </DialogContent>
        <form className={classes.form} id="pform">
        <DialogActions>
          <Button onClick={handleClose} color="primary" type="button">
            Disagree
          </Button>
          <Button onClick={submit} color="primary" type="submit" >
            Agree
          </Button>
        </DialogActions>
        </form>
      </Dialog>
      
            <Noti message={user} />
      
      
    </Container>
  );
}
