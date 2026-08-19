import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const Token = request.cookies.get("token")

    const path = request.nextUrl.pathname
    const isAuth = path === "/auth/login" || path === "/auth/register"
    if (Token && isAuth) {

        return NextResponse.redirect(new URL("/shop/products", request.url))
    }


    if (!Token && !isAuth) {

        return NextResponse.redirect(new URL("/auth/login", request.url))

    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/auth/:path*",
        "/shop/add-product",
        "/shop/my-card",
        "/profile",
    ]
}