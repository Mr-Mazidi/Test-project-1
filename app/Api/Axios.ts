import axios from "axios";

type Method = "get" | "post" | "put" | "patch" | "delete"


export async function Axios({ url, method, body, headers }: {
    url: string,
    method: Method,
    body?: object | undefined,
    headers?: Record<string, string> | undefined
}) {

    const data = await axios.request({
        url,
        method,
        data: body,
        headers,
    })
    return data.data
}

