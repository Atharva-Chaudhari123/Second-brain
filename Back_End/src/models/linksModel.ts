import mongoose, {Schema, Document} from 'mongoose';

export interface ILink extends Document{
    hash : string ,
    userId : mongoose.Types.ObjectId 
} ;

const LinksSchema : mongoose.Schema<ILink> = new Schema({
    hash : { 
        type: String, 
        unique :true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref: "User" 
    }
}) ;

const LinksModel = mongoose.model<ILink>("Links", LinksSchema) ;
export default LinksModel ;
