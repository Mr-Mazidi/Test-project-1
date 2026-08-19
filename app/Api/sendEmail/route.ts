import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { SetCodeEmail } from "../Token";


const resend = new Resend(
    process.env.RESEND_API_KEY
);


export async function POST(request: NextRequest) {
    const { email } = await request.json();

    const code = Math.floor(
        100000 + Math.random() * 900000
    ).toString();

    await SetCodeEmail({ code: code })

    const { data, error } = await resend.emails.send({
        from: "My Shop <onboarding@resend.dev>",

        to: email,

        subject: "Verification Code",

        html: `<h1>Your verification code</h1>
             <h1>PassWord:pistol</h1>
            <h2>${code}</h2>
            <p>This code expires in 2 minutes</p> `

    });

    if (error) {
        return NextResponse.json(error, { status: 400 })
    }

    return NextResponse.json({
        data,
        message: "Code sent"
    });

}

