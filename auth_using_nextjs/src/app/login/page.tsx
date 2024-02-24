"use client"
import Link from "next/link";
import React,{useState,useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";


export default function loginPage(){
    const router=useRouter();
    const [user, setuser] = React.useState({
        email:"",
        password:""
    })
    const [buttonDisabled, setButtonDisabled] =useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(user.email.length && user.password.length){
          setButtonDisabled(false)
        }else{
          setButtonDisabled(true)
        }
      }, [user])

    const onLogin = async ()=>{
        try {
            setLoading(true)
            const response= await axios.post("/api/users/login",user);
            console.log("Login successful")
            toast.success("Login success")
            router.push("/profile")
        } catch (error:any) {
            console.log("login failed",error.message)
            toast.error(error.message);
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-950">
            <h1 className="text-2xl text-blue-700">{loading ? "Processing" : "Login Page"}</h1>

                 <label htmlFor="email" className="text-white">Email</label>
            <input className="p-3 bg-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" 
                type="text"
                id="email" 
                value={user.email}
                onChange={(e)=>setuser({
                    ...user,email:e.target.value
                })}
                placeholder="email"/>

                <label htmlFor="password" className="text-white">Password</label>
            <input className="p-3 bg-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" 
                type="password"
                id="password" 
                value={user.password}
                onChange={(e)=>setuser({
                    ...user,password:e.target.value
                })}
                placeholder="password"/>

                <button 
                onClick={onLogin} 
                className="p-3 bg-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"> Login Here</button>
                <Link href="/signup" className="text-white">Visit Signup Page</Link>
                
        </div>
    )
}