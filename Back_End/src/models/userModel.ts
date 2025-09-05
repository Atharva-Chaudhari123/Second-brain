import mongoose, {Schema , Document } from 'mongoose' ;
import bcrypt from 'bcrypt' ; 

// Define the type for the password comparison method.
type ComparePasswordMethod = (candidatePassword: string) => Promise<boolean>;


export interface IUser extends Document {
  username: string;
  password: string;
  comparePassword: ComparePasswordMethod;
}


const UserSchema : mongoose.Schema<IUser> = new Schema ({

    username : {type : String , required : true, unique: true  },
    password : {type : String , required : true },

}) ;

UserSchema.pre('save', async function( next ){ 
    const user = this ; // pointing to the current docuement being updated

    if(!user.isModified('password')) {
        next() ;
    }

    try{
        const salt  = await bcrypt.genSalt(5) ;
        user.password = await bcrypt.hash(user.password , salt) ;
        next() ;
    }catch(error : any){
        next(error) ;
    }
}) ;


UserSchema.methods.comparePassword = async function(candidatePasswod : string ) : Promise<boolean> {
    return bcrypt.compare(candidatePasswod, this.password) ;
    //this refers to document therfore this.password is hashed password
}

const UserModel = mongoose.model<IUser>("Users", UserSchema, "Users") ;

export default UserModel ;