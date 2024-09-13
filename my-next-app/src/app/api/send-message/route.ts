import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User";
export async function POST(request: Request){
    await dbConnect();
   const {username,content}= await request.json();
   const lowerCaseUsername = username.toLowerCase();
   
   try {
    
   const user = await UserModel.findOne({ username });
   console.log(user)
   if (!user) {
    return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );

    
   }
   //is user acception the messages
   if (!user.isAcceptingMessage) {
    return Response.json(
        {
          success: false,
          message: "User is not acception the messages",
        },
        { status: 401 }
      );
    
   }
   const newMessage ={content,createdAt:new Date()}
   user.messages.push(newMessage as Message)
   await user.save();
   return Response.json(
    {
      success: true,
      message: "Message send successfully",
    },
    { status: 200 }
  );


    
   } catch (error) {
    console.log("Error adding messages",error);
    return Response.json(
        {
          success: false,
          message: "Internal server error",
        },
        { status: 500 }
      );
    
   }

}