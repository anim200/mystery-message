import { getServerSession } from "next-auth";

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {User} from "next-auth"
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";
export async function GET(request:Request){
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;
  
    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "Error verifying user",
        },
        { status: 401 }
      );
    }
    
    const userId = new mongoose.Types.ObjectId(user._id);
    console.log(userId)
    try {
      const user = await UserModel.aggregate([
        { $match: { _id: userId } },
        { $unwind: '$messages' },
        { $sort: { 'messages.createdAt': -1 } },
        { $group: { _id: '$_id', messages: { $push: '$messages' } } },
      ]).exec();
        console.log("user",user)
        if (!user || user.length === 0) {
            return Response.json({
                success:false,
                message:"No messages yet"
            },
            {status: 401}
        )
            
        }
        return Response.json({
            success:true,
            messages:user[0].messages
        },
        {status: 200}
    )
    
    } catch (error) {
        console.log("An unexpected error occured",error)
        return Response.json(
            {
              success: false,
              message: "Not Authenticated",
            },
            { status: 500 }
          );
        

        
    }
    
}
