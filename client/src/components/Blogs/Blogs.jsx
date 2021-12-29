import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  Slide,
  Snackbar,
  Typography
} from "@material-ui/core";
import useStyle from "./style";
import Blog from "./Blog/Blog";
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react";
import { getBLogs } from "../../actions/blogs";
import Loading from "../Loading/Loading";
import CancelSharpIcon from '@material-ui/icons/CancelSharp';
import { closePop } from "../../actions/auth";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}


export default function Blogs() {
    const classes = useStyle()
    const dispatch = useDispatch()
    

    useEffect(()=>{
      dispatch(getBLogs())
    },[dispatch])

    const {blogs,loading} = useSelector((state)=> state.blogs)
    const auth = useSelector((state)=> state.auth)
    
    if (loading || !blogs){
      return (
        <Loading/>
      )
    }
    

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={2}>
        {blogs.map((blog,key) =>(
          <Blog key={key} id={blog._id} title={blog.title} date={blog.publish_date} plan={blog.plan.name} intro={blog.intro} />
        ))}
        
      </Grid>

      <Snackbar open={auth.success} autoHideDuration={6000} onClose={()=> dispatch(closePop())} TransitionComponent={SlideTransition}  >
        <div className={classes.snackbar} >
        <Button size="small" onClick={()=> dispatch(closePop())} ><CancelSharpIcon/></Button>
          <Typography>Transaction have been completed. </Typography>
        </div>
        
      </Snackbar>
    </Container>
  );
}
