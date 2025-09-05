import mongoose from "mongoose";
import UserModel, {IUser} from "../models/userModel.js";
import { Request, Response } from "express";
import z, {treeifyError, ZodError} from "zod";
import { error } from "console";

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

export async function handleUserSignUP(req : Request<UserSignUpBody> , res : Response  ){

    try{
        console.log("Reached controller function") ;
        
        const validatedData =  userSignUpSchema.parse(req.body) ;

        const user: IUser = new UserModel({
            username : validatedData.username ,
            password : validatedData.password  
        }) ;

        await user.save() ;

        res.status(200).json({status : 200 , message : "User created successfully :) "});

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

export async function handleUserSignIn(req : Request, res : Response){ 

    try{    
        const {username , password} = req.body ;
        const user =await  UserModel.findOne({username}) ;

        const isMatch = await user?.comparePassword(password) ;

        if ( isMatch){
            //this means user exist 
            res.status(200).json({status:200 , message:"User found" }) ;   
        }
        else{
            res.status(404).json({status:404 , message : "User not found"}) ;
        }

    }catch(error : any){
        res.status(500).json({status : 500 , message : "Error or user not found", error})
    }

}