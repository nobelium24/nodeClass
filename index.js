const express = require("express")
const app = express()
const env = require("dotenv")
env.config()
const UserRouter = require("./routes/UserRoutes")
const ProductRoutes = require("./routes/ProductRoutes")
const connectDb = require('./config/dbconfig')
const productrouter = require("./routes/ProductRoutes")
const cors = require("cors");

app.use(cors({origin:"*"}));
app.use(express.urlencoded({ extended: true, limit:"200mb" }));
app.use(express.json({extended:true, limit:"200mb"}));

app.use(UserRouter);
app.use(productrouter);


connectDb()


app.listen(4000, ()=>{
    console.log("App is running on port 4000");
})