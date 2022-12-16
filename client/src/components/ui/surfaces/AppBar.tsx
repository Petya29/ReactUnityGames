import { CSSProperties, HTMLAttributes } from "react";

type AppBarProps = {
    position?: CSSProperties['position']
} & HTMLAttributes<HTMLHeadingElement>

export const AppBar = ({
    position = 'static',
    style,
    children,
    className,
    ...rest
}: AppBarProps) => {
    return (
        <header
            className={[
                "bg-[#1e1e1e]",
                "text-white",
                "w-full",
                className
            ].join(" ").trim()}
            style={{
                ...style,
                position: position,
                top: '0'
            }}
            {...rest}
        >
            {children}
        </header>
    )
}
