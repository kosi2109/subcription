import {makeStyles} from "@material-ui/core"

export default makeStyles({
    media:{
        height: 0,
        paddingTop: '56.25%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'darken',
    },
    card :{
        position: "relative",
        textAlign: "center"
    },
    introContainer:{
        height : "100px",
        whiteSpace : "normal",
        overflow : "hidden",
        textOverflow : "ellipsis",
        width: "100%"
    },
    title : {
        height : "100px",
        overflow : "hidden",
        textOverflow : "ellipsis",
    }
})