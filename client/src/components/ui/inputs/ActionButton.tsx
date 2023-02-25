import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { ArrowLeftIcon } from "../icons";
import { Ripple, RippleProps } from "../utils";

type ActionButtonProps = {
    disableRipple?: boolean,
    rippleProps?: RippleProps,
    children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(({
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
                'bg-white',
                'w-36',
                'h-14',
                'transition-all',
                'shadow-btn',
                'top-0',
                'left-0',
                'active:shadow-btn-active',
                'active:top-2',
                'active:left-2',
                className
            ].join(' ').trim()}
            {...rest}
        >
            <div className="flex justify-center items-center">
                {children}
                <ArrowLeftIcon
                    isHoverable={false}
                    disableRipple={true}
                    size="sm"
                    strokeColor="#d200fa"
                    strokeWidth="4px"
                />
            </div>
            {!disableRipple && <Ripple {...rippleProps} backgroundColor='#d200fa' />}
        </button>
    )
})
