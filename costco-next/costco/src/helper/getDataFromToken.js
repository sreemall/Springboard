import jwt from "jsonwebtoken";


export default function getDataFromToken (req) {
    
    //const token = req.cookies.get ("jwt")?.value || "";
    const token = req.cookies.get("jwt")?.value;
    if (!token) {
        throw new Error("No token");
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not configured");
    }

    try {
        const decoded = jwt.verify (token, secret);
        console.log ("Decoded JWT= ", decoded);
        return decoded;
    }
    catch (error) {
        console.error (error.message);
        throw new Error("Invalid or expired token");
    }
}