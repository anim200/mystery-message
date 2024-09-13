import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
type ConnectionObject ={
    isConnected?: number
}
const connection: ConnectionObject={}

async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log("Already connected to database");
        return
    }
    try{
        const mongoUri = process.env.MONGO_URI;
        
        console.log('Connecting to MongoDB with URI:', mongoUri);
        const db = await mongoose.connect(mongoUri || '', {});
       connection.isConnected = db.connections[0].readyState

       console.log("db connected successfully");

    }catch(error){
        console.log("Database connection failed",error);
        process.exit(1)
    }
}
export default dbConnect;

    
