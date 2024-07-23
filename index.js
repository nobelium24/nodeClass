const express = require("express")
const app = express()
const env = require("dotenv")
env.config()
const UserRouter = require("./routes/UserRoutes")
const ProductRoutes = require("./routes/ProductRoutes")
const connectDb = require('./config/dbconfig')
const productrouter = require("./routes/ProductRoutes")
const cors = require("cors");
const socketIo = require("socket.io");

app.use(cors({origin:"*"}));
app.use(express.urlencoded({ extended: true, limit:"200mb" }));
app.use(express.json({extended:true, limit:"200mb"}));

app.use(UserRouter);
app.use(productrouter);


connectDb()


const server = app.listen(4000, ()=>{
    console.log("App is running on port 4000");
});

const io = new socketIo.Server(server, {
    cors: {
        origin:"*"
    }
});


//Emit: Used to send messages in the socket connection
//On: Used to listen to messages in the socket connection
io.on("connection", (socket)=>{
    console.log(`user with id ${socket.id} is connected.`);
    socket.on("message", (message)=>{
        console.log(message);
        io.emit("broadcast", message)
    })

    socket.on("disconnect", ()=>{
        console.log(`user with id ${socket.id} is disconnected.`);
    })
})