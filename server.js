import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors'
import { connectDB } from './config/db.js';
import  productRoute  from './routes/product-routes.js';
import userRoute from './routes/user-routes.js';


dotenv.config()
const app = express();
// for connection 
app.use(cors())
// for json data
app.use(express.json())
// body parser  for taking data from document or body 
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use("/",productRoute)
app.use("/",userRoute)
app.use("/", paymentRoute)
app.use("/", cartRoute)

connectDB()
const  port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log("server Created")
})
