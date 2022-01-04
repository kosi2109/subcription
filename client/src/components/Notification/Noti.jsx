import React from "react";
import { closePop } from "../../actions/auth";
import { Snackbar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import MuiAlert from "@material-ui/lab/Alert";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Noti({ message }) {
  const dispatch = useDispatch();
 
  return (
    <Snackbar
      open={message.error || message.success}
      autoHideDuration={2000}
      onClose={() => dispatch(closePop())}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={() => dispatch(closePop())}
        severity={message.error ? "error" : "success"}
      >
        {message.error || message.success}
      </Alert>
    </Snackbar>
  );
}
