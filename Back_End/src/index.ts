import express, {Express} from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose' ;
import UserModel, { type IUser } from "./models/userModel.js";
import {Router as userRouter} from './routes/userRoutes.js';
import cors from 'cors' ;

//configs and constants
dotenv.config() ;
const app: Express = express() ;
const port:  number | undefined | string = process.env.PORT ;

//middlewares
app.use(cors()) ;
app.use(express.json()) ;
app.use(express.urlencoded());


///routing
app.use("/user", userRouter )


//basic landing page route  
app.get("/",(req, res)=>{
    res.send("Hello there !!! we finally ran TS code") ;
    res.end();
}) ;



//lets connect mongo db 
mongoose.connect(process.env.MONGO_URI!)
.then(()=> console.log("Mongo Db connected successfully :) ")) 
.catch(()=> console.log("Cannot connect monogo :(")) ;

//lets check if its working -- creating a user

// const createFirstUser : ()=>void = ()=>{
//     const result : Promise<void> = UserModel.create({
//         username : "Atharva" ,
//         password : "Atharva@123"
//     })
//     .then(()=>{console.log("User Created")})
//     .catch(()=>console.log("Cannot create a user")) ;
// }

// createFirstUser() ;

//starting server
app.listen(port, ()=>{
    console.log("Server Started Successfully") ;
})