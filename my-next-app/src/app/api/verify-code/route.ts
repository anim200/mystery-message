import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

export async function POST(request:Request) {
    await dbConnect();
    try{
        const {username,code} = await request.json();
       const decodedUsername = decodeURIComponent(username);
       
       const user=await UserModel.findOne({
        username:decodedUsername
       })
       console.log(user)
       if (!user) {
        return Response.json({
            success:false,
            message:"user not found"
        },
        {status:500}
    
    )

        
       }
       const isCodeValid=(user.verifyCode===code)
       console.log(user.verifyCode);
       console.log(code);
       const isCodeNotExpired = new Date(user.verifyCodeExpiry)>new Date
       if (isCodeValid && isCodeNotExpired) {
           user.isVerified = true
           await user.save()
           return Response.json({
            success:true,
            message:"Account verified successfully"
        },
        {status:200}
    
    )
        
       }else if (!isCodeNotExpired) {
        return Response.json({
            success:false,
            message:"Verification code has expired,please signup again to get a new code"
        },
        {status:500}
    
    )
        
       }else{
        return Response.json({
            success:false,
            message:"Incorrect validation code"
        },
        {status:500}
    
    )

       }
       


    }catch (error) {
        console.error("Error checking username", error);
        return Response.json(
          {
            success: false,
            message: "Error checking username"
          },
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    
}