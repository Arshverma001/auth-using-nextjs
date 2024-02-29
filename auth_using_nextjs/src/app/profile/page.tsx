"use client"
import axios from "axios"
import toast from "react-hot-toast"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ProfilePage(){
    const router=useRouter();
    const [data, setData] = useState("Empty")
    const logout= async () =>{
        try {
            await axios.get('api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
            
        } catch (error:any) {
            console.log(error)

        }
    }

    const getUserDetails = async ()=>{
        const res=await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }


    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-950">
            <h1 className="text-2xl text-blue-700">Profile</h1>
            <hr/>
            <p className="text-lg text-blue-700">Profile Page</p>
            <h2 className="p-1 rounded bg-green-500">{data === 'Empty' ? "No Data Found" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
            <button onClick={logout} className="p-3 mt-4 bg-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Logout</button>
            <button
            onClick={getUserDetails}
            className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >GetUser Details</button>
        </div>
    )
}