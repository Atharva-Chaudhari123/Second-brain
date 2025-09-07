import mongoose from "mongoose";
import UserModel, {IUser} from "../models/userModel.js";
import { Request, Response } from "express";
import z, { ZodError} from "zod";
import {generateJWTToken} from '../middlewares/auth.js' ;

const userSignUpSchema = z.object({
    username: z.string()
        .min(3, { message: "Username must contain at least 3 chars" })
        .max(10, { message: "Username cannot contain more than 10 chars" }),
    password: z.string()
        .min(8, { message: "Password must contain at least 8 chars" })
        .max(20, { message: "Password cannot contain more than 20 chars" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
        .regex(/\d/, { message: "Password must contain at least one number." })
        .regex(/[!@#$]/, { message: "Password must contain at least one special character (!, @, #, or $)." })
});

// Infer the type for robust type-checking.
type UserSignUpBody = z.infer<typeof userSignUpSchema>;

export async function handleUserSignUP(req : Request<{},{},UserSignUpBody> , res : Response  ){

    try{
        console.log("Reached controller function") ;
        
        const validatedData =  userSignUpSchema.parse(req.body) ;

        const user: IUser = new UserModel({
            username : validatedData.username ,
            password : validatedData.password  
        }) ;

        const savedUser : IUser = await user.save() ;
        
        const token = generateJWTToken(savedUser) ;
        res.status(200).json({status : 200 , message : "User created successfully :) ", token, username: validatedData.username});

    }catch(error : any){

        if(error instanceof ZodError){
            console.log("Error In inputs") ;
            res.json({status : 411 , message : "Error in Input" , error : error.issues}) ;
        }else if (error.code === 11000) {
            //this credentials alredy exist in the database
            console.error("Duplicate Key Error:", error.message);
            res.status(403).json({ status: 403, message: "A user with this username already exists." });
        } 
        else{
            console.log("There was problem creating user") ;
            res.status(500).json({status : 500, messgae : "Internal Server Error, Could not create the user " })
        }
    }

}

export async function handleUserSignIn(req : Request<{}, {}, UserSignUpBody>, res : Response){ 

    try{    
        
        //reusing userSignUpSchema for sing in
        const validatedData = userSignUpSchema.parse(req.body) ;
        const validCreds  = {
            username : validatedData.username ,
            password : validatedData.password
        }

        const user = await  UserModel.findOne({username : validCreds.username}) ;
        if(user == null ) throw new Error("No user with the provided credentials") ;

        
        const isMatch = await user.comparePassword(validCreds.password) ;
        if ( isMatch){
            //this means user entered correct password and username
            const token : string  = generateJWTToken(user) ; 
            res.status(200).json({status:200 , message:"User found", token, username : validCreds.username }) ;   
            // token = "invalid JWT_Secret" if  jwt secret not available 
        }
        else{
            res.status(404).json({status:404 , message : "Incorrect Password or Username"}) ;
        }

    }catch(error : any){
        if(error instanceof ZodError){
            res.status(401).json({status :401 , message : "Error in inputs" , errors :  error.issues}) ;
        }
        if(error.code == 11 ){
            res.status(404).json({status : 404 , message : "User not found", error}) ;
        } 
        res.status(500).json({status : 500 , message : "Error or user not found", error})
    }

}