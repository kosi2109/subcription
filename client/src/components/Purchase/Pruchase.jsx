import { Container, FormControl, InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlans } from "../../actions/plans";
import { selectPlan } from "../../actions/purchase";




export default function Pruchase() {
    const dispatch = useDispatch()
    const  {select}  = useSelector((state) => state.purchase);
  const { plans} = useSelector((state) => state.plans);
  const price = plans.find((plan)=>plan._id==select).price
    const initialForm = {
      planId : select,
      month : 1,
      total : price
    }
    const [form , setForm] = useState(initialForm)
    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: 120,
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
      }));
    const classes = useStyles()
      
    const handleChange = (e)=>{
      setForm({...form,[e.target.name]:e.target.value})
      const price = plans.find((plan)=>plan._id==form.planId).price
      console.log(price);
    }
      
    useEffect(()=>{
        dispatch(getPlans())
    },[dispatch])
  
  console.log(form);
  return (
    <Container maxWidth="sm">
      <form>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Plan</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={form.planId}
          onChange={handleChange}
          name="planId"
          fullWidth
        >
          {plans.map((plan,key)=>(
              <MenuItem key={key} value={plan._id}>{plan.name}</MenuItem>
          ))} 
        </Select>
      </FormControl>
      </form>
    </Container>
  );
}
