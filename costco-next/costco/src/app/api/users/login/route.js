import { NextResponse } from "next/server";
import Users from "@/models/userModel";
import connectDatabase from "@/database/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST (nextRequest) {
    try {
        //console.log ("9999 In Login POST route")
        await connectDatabase ();

        const reqBody = await nextRequest.json ();
        const {email, password} = reqBody;
        //console.log ("999 Login route -- reqBody= ", reqBody, email, password);
        if (!email || !password) {
            return NextResponse.json(
                                    { error: "Email and password are required!" },
                                    { status: 400 }
                                );
        }

        const user = await Users.findOne ({email});
        if (!user) {
            return NextResponse.json ({error: "Invalid email or password!"}, {status: 401});
        }
        //console.log ("User= ", user);
        const isMatch = await bcrypt.compare (password, user.password);
        if (!isMatch) {
            return NextResponse.json ({error: "Invalid email or password!"}, {status: 401});
        }
        else {
            if (!process.env.JWT_SECRET) {
                throw new Error("JWT_SECRET is not configured!");
            }
              
            const response = NextResponse.json ({message: "Login Succssful!", 
                                                user: { id: user._id.toString(),
                                                        email: user.email
                                                }},
                                                {status: 200});
            //get token
            const token = jwt.sign ({id: user._id.toString()}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_MAX_AGE});
            //send token as cookie
            response.cookies.set ("jwt", token, {httpOnly: true,
                                                path: "/",
                                                maxAge: process.env.COOKIE_MAX_AGE});
            
            return response;
        }
    }
    catch (error) {
        console.log ("Login Error : ", error);
        return NextResponse.json ({error: error.message}, {status: 500});
    }
}