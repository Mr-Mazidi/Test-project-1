
type ButtonType = React.ComponentProps<"button"> & {
    size?: "sm" | "md" | "xl" | "none",
    className?: string
}

export default function Button({ children, className = "", size = "md", ...props }: ButtonType) {

    const Size = {
        sm: "px-2.5 py-1",
        md: "px-4.5 py-2",
        xl: "px-6.5 py-3",
        none: ""
    }


    return <button
        className={`
            bg-blue-400
        rounded-full
        transition-all duration-500
        cursor-pointer
        
        disabled:cursor-not-allowed
        disabled:opacity-50

        hover:scale-105

        focus:ring-2
        focus:ring-blue-950
        focus:ring-offset-2
        ${className}
        ${Size[size]}
        `}

        {...props}
    >
        {children}
    </button>
}

