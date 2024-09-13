import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
):Promise<ApiResponse> {
    try{
        console.log(email);
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Anonymous verification code',
            react: VerificationEmail({username,otp:verifyCode}),
          });
          
      return {success:true,message:"verificatiom send successfully"}


    }catch(emaiError){
        console.error("error sending verification email",emaiError)
        return {success:false,message:"Failed to send verification email"}

    }
    
}


