import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { Ripple, RippleProps } from "../utils";

type ButtonProps = {
    disableRipple?: boolean,
    rippleProps?: RippleProps,
    children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    disableRipple,
    rippleProps,
    className,
    children,
    ...rest
}, ref) => {
    return (
        <button
            ref={ref}
            className={[
                disableRipple ? '' : 'overflow-hidden',
                'relative',
                'text-black',
                'uppercase',
                'font-semibold',
                'bg-[#90caf9]',
                'hover:bg-[#42a5f5]',
                'transition-all',
                'rounded-[4px]',
                'px-2 py-1',
                className
            ].join(' ').trim()}
            {...rest}
        >
            {children}
            {!disableRipple && <Ripple {...rippleProps} backgroundColor='#0000006b' />}
        </button>
    )
})
