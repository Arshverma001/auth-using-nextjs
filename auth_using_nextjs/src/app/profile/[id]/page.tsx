export default function UserProfile({params} : any){
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-950">
            <h1 className="text-2xl text-blue-700">Profile</h1>
            <hr/>
            <p className="text-lg text-blue-700">Profile Page 
            <span className=" ml-2 p-2 rounded-lg bg-orange-300">{params.id}</span>
            </p>
        </div>
    )
}