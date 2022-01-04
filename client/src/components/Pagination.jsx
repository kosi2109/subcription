/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container :{
    display : "flex",
    justifyContent: "center",
    alignItems: "center",
    padding : theme.spacing(2)
  }
}));


const Paginate = ({ page , numberOfPages }) => {
  const classes = useStyles();

  return (
    <div className={classes.container} >
    <Pagination
      
      count={numberOfPages}
      page={Number(page) || 1}
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/blog?page=${item.page}`} />
      )}
    />
    </div>
  );
};

export default Paginate;