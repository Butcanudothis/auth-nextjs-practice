"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState()
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
    const getUserDetails =async () => {
        const res = await axios.get('/api/users/me')
        setData(res.data.data._id)
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className="rounded bg-green-400"
            >{data === '' ? 'nothing' : <Link
                href={`/profile/${data}`}
            >{ data }</Link>}</h2>
            <hr />
            <button className=" p-2 mt-4 border border-blue-200 rounded-lg text-white bg-black"
                onClick={logout}
            >
                Logout
            </button>
            <button className=" p-2 mt-4 border border-purple-200 rounded-lg text-white bg-black"
                onClick={getUserDetails}
            >
                Get User Details
            </button>
        </div>
    )
}