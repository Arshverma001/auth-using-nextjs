"use client"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ProfilePage(){
    const router=useRouter();
    const logout= async () =>{
        try {
            await axios.get('api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
            
        } catch (error:any) {
            console.log(error)

        }
    }


    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-950">
            <h1 className="text-2xl text-blue-700">Profile</h1>
            <hr/>
            <p className="text-lg text-blue-700">Profile Page</p>
            <button onClick={logout} className="p-3 mt-4 bg-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Logout</button>
        </div>
    )
}