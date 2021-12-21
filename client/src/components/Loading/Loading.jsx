import React from 'react'
import { Box, CircularProgress } from '@material-ui/core'

export default function Loading() {
    return (
        <Box  sx={{ display: 'flex',width: "100vw",height: "80vh",justifyContent:"center",alignItems:"center" }}>
            <CircularProgress />
        </Box>
    )
}
