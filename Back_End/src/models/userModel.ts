import mongoose, {Schema , Document} from 'mongoose' ;

export interface IUser extends Document{
    username : string ,
    password : string ,
} ;

const UserSchema : mongoose.Schema<IUser> = new Schema ({

    username : {type : String , required : true, unique: true  },
    password : {type : String , required : true },

}) ;


const UserModel = mongoose.model<IUser>("Users", UserSchema, "Users") ;

export default UserModel ;