
type InputType = Omit<React.ComponentProps<"input">, "size"> & {
    size?: "sm" | "md" | "xl" | "full" | "none",
    className?: string
}

export default function Input({ size = "md", className, ...props }: InputType) {

    const Size = {
        sm: "w-3/6 px-3 py-1.5",
        md: "w-4/6 px-3 py-1.5",
        xl: "w-5/6 px-3 py-1.5",
        full: "w-full px-3 py-1.5",
        none: ""
    }

    return (
        <input
            className={`
                bg-blue-400     

                rounded-full

                transition-all duration-500
                cursor-pointer

                disabled:cursor-not-allowed
                disabled:opacity-50

                focus:ring-2
                focus:ring-blue-500
                focus:ring-offset-2

                hover:scale-105

                m-1
                ${Size[size]}
                ${className}
            `}
            {...props}
        />
    )
}