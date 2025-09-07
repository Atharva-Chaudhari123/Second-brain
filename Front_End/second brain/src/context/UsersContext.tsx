
import React, {useState} from "react";


export interface IUserData{
    JWTtoken : string | null,
    username : string | null,
}

interface IAuthContext {
    user : IUserData,
    setUser : React.Dispatch<React.SetStateAction<IUserData>>
} 

const defaultValue : IUserData = {
    JWTtoken : localStorage.getItem("JWT_TOKEN")  ,
    username : localStorage.getItem("USERNAME"),
} ;


export const UserContext = React.createContext<IAuthContext | undefined>(undefined) ;


export const UserContexProvider = (props : React.PropsWithChildren)=>{

    let [user, setUser] = useState(defaultValue) ;
    return (
       < UserContext.Provider value={{user, setUser}} >
        {props.children}
       </UserContext.Provider>

    );
}



