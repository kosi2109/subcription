import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getBlogById } from '../../../actions/blogs'
import {Container,Typography,Chip,Button} from "@material-ui/core"
import moment from "moment"
import Loading from '../../Loading/Loading'
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import parse from "html-react-parser"


export default function Detail() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {blog , loading} = useSelector((state)=> state.blog)

    useEffect(()=>{
        dispatch(getBlogById(id,navigate))
    },[dispatch])
    const back = ()=>{
        navigate('/')
    }
    if (loading){
        return (
            <Loading/>
        )
    }
    return (
        <Container maxWidth="md" style={{padding:"0.5em"}}>
            <Typography variant='h3' style={{margin:"0.5em 0"}}>{blog.title} {blog.plan && <Chip label={blog.plan.name} color="primary" /> }   </Typography>
            <Typography variant='h5' style={{margin:"0.2em 0"}}>{moment(blog.publish_date).format('D/MM/YYYY')}</Typography>
            <Typography variant="body1" style={{padding:"1rem"}}>{blog.body && parse(blog.body)}</Typography>
            <Button onClick={back}><ArrowBackIcon/> Back</Button>
            
        </Container>
    )
}
