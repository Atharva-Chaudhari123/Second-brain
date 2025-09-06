import { Request, Response, NextFunction } from "express";
import  jwt, { Secret } from 'jsonwebtoken';
import { IUser } from "../models/userModel.js";

export const JWTAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided." });
    }

    // 3. Check for the JWT secret key. If it doesn't exist, it's a server config error.
    if (!process.env.JWT_SECRET) {
        // This should be an impossible case in production if .env is configured correctly.
        // It's a good practice to handle it for robustness.
        return res.status(500).json({ error: "Server Configuration Error: JWT Secret is not defined." });
    }

    // 4. Cast the secret key to the correct type for jwt.verify().
    const secretKey: Secret = process.env.JWT_SECRET;

    try {

        const decoded = jwt.verify(token, secretKey);
            
        // 6. Attach the decoded payload to the request for the next middleware to use.
        (req as any).userPayload = decoded; // Using 'any' here to simplify. A better way is to declare a custom Request type.

        // 7. Proceed to the next middleware or route handler.
        next();
    } catch (error: any) {
        // 8. If verification fails (e.g., invalid or expired token), send a 401 Unauthorized response.
        return res.status(401).json({ error: "Unauthorized: Invalid or expired token." });
    }
};


export const generateJWTToken = (userData: IUser) => {

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("Server configuration Error : JWT Secret not available");
        }

        const payload = {
            _id : userData.id ,
            username : userData.username 
        }

        const secret: Secret = process.env.JWT_SECRET;
        return jwt.sign(payload, secret);


    } catch (error: any) {
        console.log("Error while creating JWT token, JWT Secret not found");

    }
}