const express=require("express");
const {todoRouter}=require("./routes/todo.routes");
const {connection}=require("./config/db");
require("dotenv").config();
const cors=require("cors");

app=express();

app.use(cors({
    origin:"*"
}))
app.use(express.json())

app.use("/",todoRouter);

app.listen(process.env.port,async()=>{
    try{
await connection;
console.log(`port is running on ${process.env.port}`)
    }
    catch(err){
        console.log(err)
    }
})