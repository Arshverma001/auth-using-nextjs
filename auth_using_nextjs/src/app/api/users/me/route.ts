import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import {connect} from '@/dbConfig/dbConfig'

connect();

export async function GET(request:NextRequest) {
    try {
       const userId=await getDataFromToken(request)
       const user=await User.findById({_id:userId}).select("-password");//i dont want password to come with the data
       return NextResponse.json(
        {
            messgae:"User Found",
            data:user
        }
       )

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
        
    }
    
}