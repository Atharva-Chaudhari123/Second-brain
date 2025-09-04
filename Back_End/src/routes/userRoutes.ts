import express, { Express } from "express";
import { handleUserSignUP } from "../controllers/userController.js";


export const Router  = express.Router() ;


Router.post("/signup", handleUserSignUP) ;



