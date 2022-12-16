import { ElementType, forwardRef, HTMLAttributes } from "react";

enum Shadows {
    sm = "shadow-sm",
    md = "shadow-md",
    lg = "shadow-lg",
    xl = "shadow-xl",
    "2xl" = "shadow-2xl",
    inner = "shadow-inner",
    none = "shadow-none"
}

enum Rounds {
    md = "rounded-md",
    lg = "rounded-lg",
    full = "rounded-full",
    none = "rounded-none"
}

type PaperProps = {
    component?: ElementType,
    shadow?: keyof typeof Shadows,
    rounded?: keyof typeof Rounds,
} & HTMLAttributes<HTMLElement>

export const Paper = forwardRef<HTMLElement, PaperProps>(({
    component,
    shadow = 'sm',
    rounded = 'md',
    className,
    children,
    ...rest
}: PaperProps, ref) => {

    const ComponentName = component ?? 'div';

    return (
        <ComponentName
            ref={ref}
            className={[
                Shadows[shadow],
                Rounds[rounded],
                'bg-[#1e1e1e]',
                'p-2',
                className
            ].join(' ').trim()}
            {...rest}
        >
            {children}
        </ComponentName>
    )
})
