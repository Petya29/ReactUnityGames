import { CSSProperties, MouseEvent, useLayoutEffect, useState } from "react";
import './Ripple.css';

type useDebouncedRippleCleanUpProps = {
    rippleCount: number,
    duration: number,
    cleanUpFunction: () => void
}

const useDebouncedRippleCleanUp = ({ rippleCount, duration, cleanUpFunction }: useDebouncedRippleCleanUpProps) => {
    useLayoutEffect(() => {
        let bounce: any = null;
        if (rippleCount > 0) {
            clearTimeout(bounce);

            bounce = setTimeout(() => {
                cleanUpFunction();
                clearTimeout(bounce);
            }, duration * 2);
        }

        return () => clearTimeout(bounce);
    }, [rippleCount, duration, cleanUpFunction]);
};

export type RippleProps = {
    duration?: number,
    opacity?: CSSProperties["opacity"],
    backgroundColor?: CSSProperties["backgroundColor"]
}

export const Ripple = ({ duration = 1000, opacity = .5, backgroundColor = '#ffffff' }: RippleProps) => {

    const [rippleArray, setRippleArray] = useState<{
        x: number;
        y: number;
        size: any;
    }[]>([]);

    useDebouncedRippleCleanUp({
        rippleCount: rippleArray.length,
        duration: duration,
        cleanUpFunction: () => {
            setRippleArray([]);
        }
    });

    const addRipple = (e: MouseEvent<HTMLElement>) => {
        const rippleContainer = e.currentTarget.getBoundingClientRect();
        const size =
            rippleContainer.width > rippleContainer.height
                ? rippleContainer.width
                : rippleContainer.height;
        const x = e.pageX - rippleContainer.x - size / 2;
        const y = e.pageY - rippleContainer.y - size / 2;
        const newRipple = {
            x,
            y,
            size
        };

        setRippleArray(prevRippleArray => [...prevRippleArray, newRipple]);
    };

    return (
        <div
            className="rippleContainer"
            onMouseDown={addRipple}
        >
            {rippleArray.length > 0 &&
                rippleArray.map((ripple, index) => (
                    <span
                        style={{
                            top: ripple.y,
                            left: ripple.x,
                            width: ripple.size,
                            height: ripple.size,
                            opacity: opacity,
                            backgroundColor: backgroundColor,
                            animationDuration: `${duration}ms`
                        }}
                        key={"span" + index}
                    />
                ))
            }
        </div>
    )
}
