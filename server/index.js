// import depen
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express();
// middleware
app.use(express.json({}))
app.use(cors())





// routes
const blogRoute = require("./routes/blogs")
const planRoute = require("./routes/plan")
const userRoute = require("./routes/users")

app.use('/blogs',blogRoute)
app.use('/plans',planRoute)
app.use('/users',userRoute)


// db
const DB = "mongodb://localhost/subcription"
const PORT = 8000


// initialize
try {
    mongoose.connect(DB,()=>{
        app.listen(PORT,()=>{
            console.log(`Server running on ${PORT}`);
        })
    })
} catch (error) {
    console.log(error);
}






