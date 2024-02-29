import bcryptjs from 'bcryptjs'
import nodemailer from 'nodemailer'
import User from '@/models/userModel'

export const sendEmail= async ({email,emailType,userId}:any)=>{
    try {
        const hasedToken=await bcryptjs.hash(userId.toString(),10)

        if(emailType==='VERIFY'){
            await User.findOneAndUpdate(userId,{verifyToken:hasedToken,verifyTokenExpiry:Date.now() + 3600000})
        }
        if(emailType==='RESET'){
            await User.findOneAndUpdate(userId,{forgotPasswordToken:hasedToken,forgotPasswordTokenExpiry:Date.now() + 3600000})
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "24798259dbc21a",
              pass: "fef78b894f0e76"
            }
          });

          const mailOptions = {
            from: 'arshverma303@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hasedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hasedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;
    } catch (error:any) {
        throw new Error(error.message)
    }
}