const express = require("express")
const app = express()
const env = require("dotenv")
env.config()
const UserRouter = require("./routes/UserRoutes")
const ProductRoutes = require("./routes/ProductRoutes")
const connectDb = require('./config/dbconfig')
const productrouter = require("./routes/ProductRoutes")
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
connectDb()

app.use(UserRouter);
app.use(productrouter);







app.listen(4000, ()=>{
    console.log("App is running on port 4000");
})