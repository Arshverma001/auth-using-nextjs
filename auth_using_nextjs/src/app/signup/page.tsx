"use client"
import Link from "next/link";
import React,{useState,useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function signupPage(){
    const router=useRouter();
    const [user, setUser] = useState({
        username: "",
        email:"",
        password:""
    })

    const [buttonDisabled, setButtonDisabled] =useState(false)
    const [loading, setLoading] = useState(false)

    const onSignup = async ()=>{
        try {
            setLoading(true);
            const response=await axios.post("/api/users/signup",user)
            console.log("Signup successful",response.data)
            router.push("/login")
            
        } catch (error: any) {
            console.log("Signup Failed",error)
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
      if(user.username.length && user.email.length && user.password.length){
        setButtonDisabled(false)
      }else{
        setButtonDisabled(true)
      }
    }, [user])
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-950">
            <h1 className="text-2xl text-blue-700">{loading ? "Processing":"Signup Page"}</h1>

            <label htmlFor="username" className="text-white pt-3">Username</label>
            <input className="p-3  bg-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" 
                type="text"
                id="username" 
                value={user.username}
                onChange={(e)=>setUser({
                    ...user,username:e.target.value
                })}
                placeholder="username"/>

                 <label htmlFor="email" className="text-white">Email</label>
            <input className="p-3 bg-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" 
                type="text"
                id="email" 
                value={user.email}
                onChange={(e)=>setUser({
                    ...user,email:e.target.value
                })}
                placeholder="email"/>

                <label htmlFor="password" className="text-white">Password</label>
            <input className="p-3 bg-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" 
                type="password"
                id="password" 
                value={user.password}
                onChange={(e)=>setUser({
                    ...user,password:e.target.value
                })}
                placeholder="password"/>

                <button 
                onClick={onSignup} 
                className="p-3 bg-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"> {buttonDisabled ? "Cannot signup":"Signup"}</button>
                <Link href="/login" className="text-white">Visit Login Page</Link>
                
        </div>
    )
}