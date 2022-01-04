import {makeStyles} from "@material-ui/core"

export const useStyle = makeStyles((theme)=>({
    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
    container:{
        marginTop: "1rem"
    },
    paper:{
        padding: "1rem"
    },
    typography:{
        marginBottom: "1em"
    },
    margin:{
        marginBottom: "1em"
    },
    error : {
        backgroundColor : "#FF7F7F",
        padding : '1em',
        margin : "5px"
    },
    success : {
        backgroundColor : "#4bb543",
        padding : '1em',
        margin : "5px"
    }
}))