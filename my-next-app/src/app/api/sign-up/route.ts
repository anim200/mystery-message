
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
//bcrypt use kora hoise
import bcrypt from 'bcryptjs'
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
export async function POST(request:Request) {
    await dbConnect()
    try{
        
      const {username,email,password} = await request.json()
      const existingUserVerifiedByUsername=await UserModel.findOne({
        username,
        isVerified:true
      })
      if(existingUserVerifiedByUsername){
        return Response.json({
            success:false,
            message:"username is already taken"

        },{status:400})

      }
      const existingUserByEmail = await UserModel.findOne({email})
      const verifyCode = Math.floor(100000+Math.random()*900000).toString()
      console.log(verifyCode);

      if (existingUserByEmail) {
        
        if (existingUserByEmail.isVerified) {
            return Response.json({
                success:false,
                message:"user already exists with this email"

            },{status:400})
            
        }else{
            const hashedpassword =await bcrypt.hash(password,10)
            existingUserByEmail.password=hashedpassword;
            existingUserByEmail.verifyCode=verifyCode;
            existingUserByEmail.verifyCodeExpiry=new Date(Date.now()+3600000)
            await existingUserByEmail.save()

        }
        
      }else{
        const hashedpassword =await bcrypt.hash(password,10)
        const expiryDate=new Date();
        expiryDate.setHours(expiryDate.getHours()+1)
       const newUser= new UserModel({
            username,
            email,
            password:hashedpassword,
            verifyCode:verifyCode,
            verifyCodeExpiry: expiryDate,
            isVerified:false,
            isAcceptingMessage:true,
            messages: []

        })
        await newUser.save();
      }
    //send verification email
    const emailResponse = await sendVerificationEmail(
        email,
        username,
        verifyCode

    )
    if(!emailResponse.success){
        return Response.json({
            success:false,
            message:emailResponse.message

        },{status:500})
    }
      
    return Response.json({
        success:true,
        message:"user registered successfully.Please verify your email"


    },{status:201})
        
        


    }catch(error){
        console.error('Error registering user',error)
        return Response.json({
            success:false,
            message:"error registering user"
        },
        {
            status:500
        }
    
    )

    }
    
}

