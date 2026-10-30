import { NextResponse } from "next/server";


export async function POST () {
    try {
        const response = NextResponse.json ( {
            message: "Logout Successful",
            success: true
        });
        //response.cookies.set ("jwt", "", {httpOnly: true, expires: new Date(0)});
        response.cookies.set ("jwt", "", {httpOnly: true, path: "/", maxAge: 0,});
        return response;
    }
    catch (error) {
        return NextResponse.json ({"error during Logout": error.message}, {status: 500});
    }
}