import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    error : {
      backgroundColor : "#FF7F7F",
      padding : '1em', color: "#fafafa"
  },
  snackbar:{
    backgroundColor : "#4bb543",
      padding : '1em',
      color: "#fafafa",
    display: "flex",
    justifyContent : "center",
    alignItems : "center",
    flexDirection : "column",
    borderRadius : "5px"
  }
  }));