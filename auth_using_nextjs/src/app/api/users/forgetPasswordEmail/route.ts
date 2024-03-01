import {connect} from '@/dbConfig/dbConfig'
import { NextResponse,NextRequest } from 'next/server'
import {sendEmail} from '@/helpers/mailer'
import User from '@/models/userModel'

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const {email}=reqBody;
        console.log(email)

        const user=await User.findOne({email})
        
        if(!user){
            return NextResponse.json(
                {error:"User not found in db"},{status:500}
                )
        }

        await sendEmail({email,emailType:'RESET',userId:user._id})
        return NextResponse.json({message:"Forgot Password email sent"})

        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}