import React from "react";
import {
  Container,
  Grid
} from "@material-ui/core";
import useStyle from "./style";
import Blog from "./Blog/Blog";
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react";
import { getBLogs } from "../../actions/blogs";
import Loading from "../Loading/Loading";



export default function Blogs() {
    const classes = useStyle()
    const dispatch = useDispatch()
    
    useEffect(()=>{
      dispatch(getBLogs())
    },[dispatch])

    const {blogs,loading} = useSelector((state)=> state.blogs)
    
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
    </Container>
  );
}
