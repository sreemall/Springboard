import { NextResponse } from "next/server";
//import jwt from "jsonwebtoken";


export async function middleware(req) {
  //console.log("9999 In MIDDLEWARE");
  const path = req.nextUrl.pathname;
  //console.log("9999 Middleware path=", path);

  const isPublicPath = path === "/login" || path === "/register";
  const isHomePath = path === "/";

  // get jwt if it is there
  const token = req.cookies.get("jwt")?.value;
  //console.log("9999 .......Middleware jwt cookie=", token);

  let isAuthenticated = false;

  if (token && process.env.JWT_SECRET) {
    try {
      isAuthenticated = await verify(token, process.env.JWT_SECRET);
      //isAuthenticated = true;
    } catch (error) {
      // token is invalid or expired.
      console.log("err", error);
      isAuthenticated = false;
    }
  }

  //console.log("is authenticated", isAuthenticated);
  if (isHomePath)
    return NextResponse.next();

  if (isAuthenticated && path === "/login") {
    const returnUrl = req.nextUrl.searchParams.get("returnUrl");

    const destination = (returnUrl && returnUrl.startsWith("/") && !returnUrl.startsWith("//"))
                                      ? returnUrl : "/";

    return NextResponse.redirect( new URL(destination, req.url));
  }

  if (isPublicPath && isAuthenticated) {
    //cannot visit public paths
    return NextResponse.redirect(new URL("/", req.url));
  }

  // // Unauthenticated users cannot visit protected pages
  if (!isPublicPath && !isAuthenticated) {
    //console.log("unauthenicated");
    const response = NextResponse.redirect(new URL("/login", req.url));

    // Remove an invalid or expired jwt.
    if (token) {
      response.cookies.set("jwt", "", {
        httpOnly: true,
        path: "/",
        maxAge: 0,
      });
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/categories/:path*"],
};

async function verify(user) {
    const secret = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(process.env.JWT_SECRET),
      {
        name: "HMAC",
        hash: { name: "SHA-256" },
      },
      false,
      ["verify"]
    );
  
    return crypto.subtle.verify(
      "HMAC",
      secret,
      Buffer.from(user.split(".")[2], "base64url"),
      new TextEncoder().encode(user.split(".").splice(0, 2).join("."))
    );
  }