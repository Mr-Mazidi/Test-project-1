"use server"
import { cookies } from "next/headers";


export async function SetToken({ token }: { token: string }) {

    const cookieStore = await cookies()
    cookieStore.set("token", `${token}`, {
        maxAge: 24 * 60 * 60,
        httpOnly: true,
        path: "/",
        sameSite: "lax"
    }
    )
}

export async function GetToken() {

    const cookieStore = await cookies()
    return cookieStore.get("token")

}

export async function DeleteToken() {

    const cookieStore = await cookies()
    return cookieStore.delete("token")

}




export async function SetCodeEmail({ code }: { code: string }) {

    const cookieStore = await cookies()
    cookieStore.set("CodeEmail", `${code}`, {
        maxAge: 60 * 1,
        httpOnly: true,
        path: "/",
        sameSite: "lax"
    }
    )
}

export async function GetCodeEmail() {

    const cookieStore = await cookies()
    return cookieStore.get("CodeEmail")?.value

}

export async function DeleteCodeEmail() {

    const cookieStore = await cookies()
    cookieStore.delete("CodeEmail")
}