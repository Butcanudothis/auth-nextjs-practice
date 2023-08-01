"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const router = useRouter()
    const logout = async() => {
        try {
            await axios.get('/api/users/logout')
            toast.success("Logout successful")
            router.push('/login')
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <hr />
            <button className=" p-2 mt-4 border border-blue-200 rounded-lg text-white bg-black"
                onClick={logout}
            >
                Logout
            </button>
        </div>
    )
}