import { CSSProperties, forwardRef, HTMLAttributes, HTMLInputTypeAttribute } from "react";
import classes from "./TextField.module.css";

/**
 * 
 * @description splitted into: input padding x, input padding y, text size, outlined label position bottom, 
 *              outlined label position left, inlined label position bottom, lined label position left left by " "
 * @example Sizes["medium"].split(" ");
 */
enum Sizes {
    sm = "px-4 py-2 text-sm -bottom-[4%] -left-[1%] top-[10%] left-[6%]",
    md = "px-4 py-2 text-lg -bottom-[16%] -left-[1%] -top-[14%] left-[6%]",
    lg = "px-6 py-4 text-xl -bottom-[14%] left-[2%] -top-[22%] left-[8%]",
}

type TextFieldProps = {
    name?: string,
    type?: HTMLInputTypeAttribute,
    label?: string,
    value: any,
    variant?: "outlined" | "lined",
    size?: keyof typeof Sizes,
    styles?: CSSProperties,
    inputStyles?: CSSProperties
    labelStyles?: CSSProperties,
} & HTMLAttributes<HTMLInputElement>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({
    name,
    type = "text",
    label,
    value,
    variant = "outlined",
    size = "md",
    styles,
    inputStyles,
    labelStyles,
    className,
    ...rest
}: TextFieldProps, ref) => {

    const splittedSizes = Sizes[size].split(" ");

    return (
        <div style={styles}>
            <label className="relative">
                <input
                    ref={ref}
                    type={type}
                    name={name}
                    className={[
                        variant === "outlined" ? "border rounded-md" : "border-b-2",
                        splittedSizes[0],
                        splittedSizes[1],
                        splittedSizes[2],
                        "w-72",
                        "bg-[#1e1e1ebf]",
                        "border-white",
                        "border-opacity-50",
                        "outline-none",
                        "placeholder-transparent",
                        "focus:placeholder-[#ffffff80]",
                        "focus:border-[#d200fa]",
                        "transition duration-200",
                        className
                    ].join(" ")}
                    style={inputStyles}
                    {...rest}
                />
                {label &&
                    <span
                        className={[
                            value
                                ? classes["input-label-" + size + "-" + variant]
                                : classes["empty-input-label-" + size + "-" + variant],
                            variant === "outlined"
                                ? ("px-1 mx-4 " + splittedSizes[3])
                                : (splittedSizes[5] + " " + splittedSizes[6]),
                            splittedSizes[2],
                            splittedSizes[4],
                            "cursor-text",
                            "text-[#ffffff80]",
                            "absolute",
                            "transition duration-200"
                        ].join(" ")}
                        style={labelStyles}
                    >
                        {label}
                    </span>
                }
            </label>
        </div>
    )
})
