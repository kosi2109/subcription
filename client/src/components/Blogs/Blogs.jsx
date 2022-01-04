import React, { useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import useStyle from "./style";
import Blog from "./Blog/Blog";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../Loading/Loading";
import Noti from "../Notification/Noti";
import Paginate from "../Pagination";
import { useLocation } from "react-router-dom";
import { getBLogs } from "../../actions/blogs";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Blogs() {
  const classes = useStyle();
  const dispatch = useDispatch()
  const { blogs, loading , numberOfPages  } = useSelector((state) => state.blogs);
  const auth = useSelector((state) => state.auth);
  const query = useQuery()
  const page = query.get('page') || 1;
  
  useEffect(()=>{
    if (page){
      dispatch(getBLogs(page))
    }
  },[dispatch,page])
  
  
  if (!loading && !blogs.length) {
    return "No Blog";
  }

  return loading ? (
    <Loading />
  ) : (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={2}>
        {blogs.map((blog, key) => (
          <Blog
            key={key}
            id={blog._id}
            title={blog.title}
            date={blog.publish_date}
            plan={blog.plan.name}
            intro={blog.intro}
          />
        ))}
      </Grid>
      <Noti message={auth} />
      <Paginate page={page} numberOfPages={numberOfPages} />
    </Container>
  );
}
