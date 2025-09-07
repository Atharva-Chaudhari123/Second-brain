
import React, {useState} from "react";


interface IUserData{
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

export const UserContex = React.createContext<IAuthContext | undefined>(undefined) ;


export const UserContexProvider = (props : React.PropsWithChildren)=>{

    let [user, setUser] = useState(defaultValue) ;
    return (
       < UserContex.Provider value={{user, setUser}} >
        {props.children}
       </UserContex.Provider>

    );
}



