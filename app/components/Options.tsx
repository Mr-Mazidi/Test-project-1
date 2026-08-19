import React from "react";

type OptionsType = React.ComponentProps<"option">


export default function Options({ value, children, className = "", ...props }: OptionsType) {


    return (
        <option
            value={value}
            className={`
            bg-blue-500
            p-3
            cursor-pointer

            ${className}

            `}

            {...props}

        >{children}</option>
    )
}