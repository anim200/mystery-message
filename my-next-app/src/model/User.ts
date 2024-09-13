import { create } from "domain";
import mongoose,{Schema,Document, Mongoose} from "mongoose";
export interface Message extends Document{
    content: string;
    createdAt: Date


}
const MessageSchema: Schema<Message> = new Schema({
    content:{
        type: String,
        required:true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    },

})
export interface User extends Document{
    username:string;
    email:string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified:boolean;
    isAcceptingMessage:boolean;
    messages: Message[]

    
}
const userSchema: Schema<User> = new Schema({
    username:{
        type: String,
        required: [true,"Username is required"],
        trim:true,
        unique:true
    },
    email:{
        type: String,
        required: [true,"Username is required"],
        unique:true,
        match: [/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/, 'Please use a valid email address']//regex for email validation
    },
    password:{
        type: String,
        required: [true,"password is required"],

        
    },
    verifyCode:{
        type: String,
        required:[true,"Verify code is required"]
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"verify code is required"],

    },
    isVerified:{
        type: Boolean,
        default: false//by default no one is verified
    },
    isAcceptingMessage:{
        type: Boolean,
        default: true// let the user accept messages
    },
    messages:[MessageSchema]

   

})
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",userSchema)

export default UserModel;


 
