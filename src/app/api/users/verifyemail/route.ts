import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels"

connect()

export async function POST(request:NextRequest) {
    try {
        const requestBody = await request.json()
        const { token } = requestBody
        // user is a reference of User
        const user = await User.findOne({
            verifyToken: token, verifyTokenExpiry: {
                $gt: Date.now()
            }
        })
        if (!user) {
            return NextResponse.json({
                error: "Invalid Token"
            },{status: 400})
        }
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({
            message: "Email verified",
            success: true
        })
    } catch (error:any) {
        return NextResponse.json({
            error: error.message,
        },{status: 500})
    }
}