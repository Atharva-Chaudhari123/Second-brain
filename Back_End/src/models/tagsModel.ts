import mongoose,{Schema, Document} from "mongoose";

export interface ITags extends Document {
    title : string
} ;

const TagsSchema : mongoose.Schema<ITags> = new Schema({
    title : {
        type : String,
        required : true ,
        unique : true
        
    } 
}) ;


const TagsModel = mongoose.model<ITags>("Tags", TagsSchema) ;

export default TagsModel ;