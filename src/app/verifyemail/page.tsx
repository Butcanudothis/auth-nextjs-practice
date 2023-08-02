"use client"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function VerifyEmailPage() {
    const [token, setToken] = useState('')
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token })
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data.message);
        }
    }
    useEffect(() => {
        const urlToken = window.location.search.split('=')[1];
        if (urlToken) {
            setToken(urlToken || '');
        }
    }, [])
    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Verify Email</h1>
            <hr />
            <p>Verify Email Page</p>
            <input
                className="p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="text"
                id="token"
                value={token}
                onChange={(e) =>
                    setToken(e.target.value)
                }
                placeholder="token"
            />
            {verified && <p className="text-green-400">Email verified 
            <Link href="/login">Login</Link>
            </p>}
            {error && <p className="text-red-400">Email verification failed
            </p>}
        </div>
    )
}