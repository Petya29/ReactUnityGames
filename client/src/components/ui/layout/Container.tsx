import { ElementType, HTMLAttributes } from "react";

enum ContainerSizes {
    xs = "max-w-xs",
    sm = "max-w-screen-sm",
    md = "max-w-screen-md",
    lg = "max-w-screen-lg",
    xl = "max-w-screen-xl",
    "2xl" = "max-w-screen-2xl",
    full = "max-w-full",
    none = "max-w-none"
}

type ContainerProps = {
    component?: ElementType,
    maxWidth?: keyof typeof ContainerSizes,
    disableGutters?: boolean,
} & HTMLAttributes<HTMLElement>

export const Container = ({
    component,
    maxWidth = 'full',
    disableGutters = false,
    className,
    children,
    ...rest
}: ContainerProps) => {

    const ComponentName = component ?? 'div';

    return (
        <ComponentName
            className={[
                ContainerSizes[maxWidth],
                disableGutters ? '' : 'm-auto',
                className
            ].join(' ').trim()}
            {...rest}
        >
            {children}
        </ComponentName>
    )
}