import React from 'react'
import { Badge, Button, Card, CardActions, CardContent, CardMedia, Chip, Grid, Paper ,Typography } from '@material-ui/core'
import moment from "moment"
import {Link} from "react-router-dom"
import useStyle from "./style"

export default function Blog({id,title,date,plan,intro}) {
  const classes = useStyle()
    return (
        <Grid item lg={3} md={4} sm={6} xs={12}>
            <Paper elevation={3} variant="string">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
          <Card>                                                                                                                                                
          <CardMedia className={classes.media} image={'https://i.picsum.photos/id/437/200/300.jpg?hmac=qjAKcFjQXvVBX_di7_9jMlPlgfQZUK2AV1IQ6W1eIIw'} title={title} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {intro}
              </Typography>
              <div style={{display:"flex" ,justifyContent:"space-between",marginTop:"1em"}}>
              <Typography variant="body2" color="text.secondary">
               {moment(date).format("D/MM/YYYY")}
                
              </Typography>
              <Chip label={plan} color="primary" size="small" />
              </div>
              
            </CardContent>
            <CardActions style={{display:"flex" ,justifyContent:"space-between"}}>
              <Button size="small">Share</Button>
              <Link to={`/b/${id}`}>
                <Button size="small">View</Button>
              </Link>
            </CardActions>
          </Card>
          </Paper>
        </Grid>
    )
}
