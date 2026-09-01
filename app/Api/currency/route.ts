import { NextRequest, NextResponse } from "next/server";
import axios from "axios";


export async function GET(reqeste: NextRequest) {

    const amount = reqeste.nextUrl.searchParams.get("amount")
    const from = reqeste.nextUrl.searchParams.get("from")
    const to = reqeste.nextUrl.searchParams.get("to")


    const response = await axios.request({
        url: `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`,
        method: "get"
    })


    return NextResponse.json(response.data)

}