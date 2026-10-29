import connectDatabase from"@/database/db";
import Users from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcrypt";



export async function POST (nextRequest) {
    try {
        await connectDatabase ();

        const reqBody = await nextRequest.json();
        const {firstName, lastName, email, password} = reqBody;

        if (!firstName || !lastName || !email || !password) {
            throw new Error ("firstName, lastName, email and password are required fields");
        }
        const user = await Users.findOne ({email});
        
        if (user) {
            console.log ("999 User already exists=", user);
            return NextResponse.json ({error: "User already exist with this email"}, {status: 400});
        }

        const salt = await bcrypt.genSalt (10);
        const hashedPassword = await bcrypt.hash (password, salt);
        const newUser = await Users.create ({firstName, lastName, email, password: hashedPassword});
        console.log ("999 newUser=", newUser);
        return NextResponse.json ({message: "User created Successfully",
                                    //user: newUser
                                    user: {
                                        _id: newUser._id,
                                        firstName: newUser.firstName,
                                        lastName: newUser.lastName,
                                        email: newUser.email,
                                    },
                                },
                                {status: 201});
    }
    catch (error) {
        console.log ("999 catch error=", error);
        // console.error("SIGNUP ERROR:", error);
        return NextResponse.json ({error: error.message}, {status: 500});
    }
}
