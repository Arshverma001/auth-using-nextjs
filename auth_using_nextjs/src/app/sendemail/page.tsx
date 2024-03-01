"use client"

import React , {useState,useEffect} from "react"
import axios from "axios"
import toast from "react-hot-toast"

export default function sendEmail(){
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({ email: "" });
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
        </div>
    )
}