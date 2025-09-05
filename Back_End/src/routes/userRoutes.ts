import express, { Express } from "express";
import { handleUserSignUP, handleUserSignIn } from "../controllers/userController.js";


export const Router  = express.Router() ;


Router.post("/signup", handleUserSignUP) ;
Router.post("/signin", handleUserSignIn) ;






