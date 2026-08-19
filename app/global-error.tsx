"use client"

export default function GlobalError({
    error, reset
}: {
    error: Error;
    reset: () => void;
}) {

    return (
        <div>


            <h1>There Was A Problem Please Try Again</h1>

            <p>{error.message}</p>

            <button onClick={reset}>Try Again</button>


        </div>
    )
}