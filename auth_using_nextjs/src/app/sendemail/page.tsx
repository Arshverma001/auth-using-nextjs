"use client"

import React , {useState,useEffect} from "react"
import axios from "axios"
import toast from "react-hot-toast"

export default function sendEmail(){
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({ email: "" });
    const [forgetPasswordStatus, setForgetPasswordStatus] = useState(false)

    const forgetPassword = async ()=>{
        try {
            setLoading(true);
            const response= await axios.post('/api/users/forgetPasswordEmail',user);
            console.log("Forget password email sent",response)
            toast.success("Forget Password email sent")
            setForgetPasswordStatus(true)
            setUser({email:""})
        } catch (error:any) {
            console.log("Login Failed",error.message)
            toast.error(error.message)
            
        }
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-950">
            <h1 className="text-2xl text-blue-700">{loading ? "Processing" :"Forgot Password"}</h1>
            <input 
             className="p-3 mt-4 bg-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
             type="text"
             id="email"
             placeholder="Enter email"
             value={user.email}
             onChange={(e)=>setUser({
                ...user,email:e.target.value
            })}>
            </input>
            <button 
            className="p-3 bg-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            onClick={forgetPassword}>
                Send Email
            </button>
        </div>
    )
}