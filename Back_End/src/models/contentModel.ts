import mongoose, { Schema, Document } from 'mongoose';

export interface IContent extends Document {
    link?: string,
    title: string,
    userId: mongoose.Types.ObjectId
    tags: mongoose.Types.ObjectId[]
}


const contentSchema: mongoose.Schema<IContent> = new Schema({
    link: { type: String },
    title: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" //collection name not variable
    }, 
    tags: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Tag" }
    ]
});


const contentModel = mongoose.model<IContent>("Contents", contentSchema);
export default contentModel;

// i think we need descreption here