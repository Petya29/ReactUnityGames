import { CSSProperties, FocusEvent, forwardRef, HTMLAttributes, MouseEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowDownIcon, XMarkIcon } from "../../icons";
import classes from "./Select.module.css";

export type SelectOption = {
    label: string,
    value: string
}

/**
 * 
 * @description splitted into: div height, text size, list margin from div, label position by " "
 * @example Sizes["medium"].split(" ");
 */
enum Sizes {
    sm = "h-8 text-sm top-9 top-[17%]",
    md = "h-10 text-lg top-11 top-[14%]",
    lg = "h-14 text-xl top-[3.7rem] top-[24%]",
}

type SelectProps = {
    options: SelectOption[],
    value?: SelectOption,
    label?: string,
    clearable?: boolean,
    defaultOpen?: boolean,
    hideArrow?: boolean,
    fullWidth?: boolean,
    variant?: "outlined" | "lined",
    maxListHeight?: CSSProperties["maxHeight"],
    size?: keyof typeof Sizes,
    iconSize?: keyof typeof Sizes | null,
    listStyles?: CSSProperties,
    listItemStyles?: CSSProperties,
    onChange: (option: SelectOption | undefined) => void
} & HTMLAttributes<HTMLDivElement>

export const Select = forwardRef<HTMLDivElement, SelectProps>(({
    options,
    value,
    label,
    clearable = false,
    defaultOpen = false,
    hideArrow = false,
    fullWidth = false,
    variant = "outlined",
    maxListHeight = 250,
    size = "md",
    iconSize = null,
    listStyles,
    listItemStyles,
    className,
    onChange,
    onClick,
    onBlur,
    ...rest
}: SelectProps, ref) => {

    const innerRef = useRef<HTMLDivElement | null>(null);
    const listRef = useRef<HTMLUListElement | null>(null);

    const [open, setOpen] = useState<boolean>(defaultOpen);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(
        options.findIndex(option => option.value === value?.value) !== -1
            ? options.findIndex(option => option.value === value?.value)
            : null
    );

    const toggleOpen = (e: MouseEvent<HTMLDivElement>) => {
        if (onClick) onClick(e);
        setOpen(prevState => !prevState);
    }

    const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
        if (onBlur) onBlur(e);
        setOpen(false);
    }

    const handleClear = (e: MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        onChange(undefined);
    }

    const handleClickItem = (option: SelectOption) => {
        if (value !== option) onChange(option);
    }

    const handleSelectedIndex = (value: number | null) => {
        setSelectedIndex(value);
    }

    useEffect(() => {
        const keydownHandler = (e: KeyboardEvent) => {
            if (e.target !== innerRef.current) return;

            switch (e.code) {
                case "Enter":
                    if (!open) {
                        setOpen(true);
                        break;
                    } else if (open && selectedIndex !== null) {
                        handleClickItem(options[selectedIndex]);
                        innerRef.current?.blur();
                    }
                    break;
                case "Space": setOpen(true);
                    break;
                case "Escape": setOpen(false);
                    break;
                case "ArrowUp":
                case "ArrowDown": {
                    if (!open) {
                        setOpen(true);
                        break;
                    }

                    if (selectedIndex === null) {
                        if (e.code === "ArrowDown") {
                            setSelectedIndex(0);
                        } else {
                            setSelectedIndex(options.length - 1);
                        }
                        break;
                    }
                    const newSelectedIndex = selectedIndex + (e.code === "ArrowDown" ? 1 : -1);

                    if (newSelectedIndex < 0) {
                        setSelectedIndex(options.length - 1);
                    } else if (newSelectedIndex > (options.length - 1)) {
                        setSelectedIndex(0);
                    } else {
                        setSelectedIndex(newSelectedIndex);
                    }

                    break;
                }
                default:
                    break;
            }
        }

        innerRef.current?.addEventListener("keydown", keydownHandler);

        return () => {
            innerRef.current?.removeEventListener("keydown", keydownHandler);
        }
    }, [open, selectedIndex, options]);

    useEffect(() => {
        // Next tick
        setTimeout(() => {
            if (!listRef.current) return;

            listRef.current.style.transform = "scale(1) translate(0)";
            listRef.current.style.opacity = "1";
        }, 0);
    }, [open, listRef.current]);

    const splittedSizes = Sizes[size].split(" ");

    return (
        <label className="relative">
            <div
                ref={(el: HTMLDivElement) => {
                    innerRef.current = el;
                    if (typeof ref === "function") {
                        ref(el);
                    } else if (ref) {
                        ref.current = el;
                    }
                }}
                className={[
                    splittedSizes[0],
                    splittedSizes[1],
                    classes["select-" + size + "-" + variant],
                    variant === "outlined" ? "border rounded" : "border-b-2",
                    "relative",
                    "flex",
                    "items-center",
                    "justify-between",
                    "bg-[#1e1e1ebf]",
                    "border-white",
                    "text-white",
                    "text-left",
                    "p-2",
                    "cursor-pointer",
                    "border-opacity-50",
                    "outline-none",
                    "placeholder-transparent",
                    "focus:border-[#d200fa]",
                    "transition duration-200",
                    fullWidth ? "w-full" : "",
                    className
                ].join(" ").trim()}
                onClick={toggleOpen}
                onBlur={handleBlur}
                tabIndex={0}
                {...rest}
            >
                <span className={`select-none ${value ? "" : "invisible"}`}>{value ? value.label : label}</span>
                {clearable
                    ?
                    <div className={["flex", size === "lg" ? "gap-3" : ""].join(" ").trim()}>
                        <span>
                            <XMarkIcon
                                disableRipple
                                isHoverable={false}
                                size={iconSize ? iconSize : size}
                                onClick={e => handleClear(e)}
                            />
                        </span>
                        {!hideArrow &&
                            <span>
                                <ArrowDownIcon
                                    className={`transition duration-200 ${open ? "rotate-180" : ""}`}
                                    disableRipple
                                    isHoverable={false}
                                    size={iconSize ? iconSize : size}
                                />
                            </span>
                        }
                    </div>
                    :
                    (!hideArrow &&
                        <span>
                            <ArrowDownIcon
                                className={`transition duration-200 ${open ? "rotate-180" : ""}`}
                                disableRipple
                                isHoverable={false}
                                size={iconSize ? iconSize : size}
                            />
                        </span>)
                }
                {open &&
                    <ul
                        ref={listRef}
                        className={[
                            splittedSizes[2],
                            "absolute",
                            "overflow-auto",
                            "z-[9999]",
                            "left-0",
                            "w-full",
                            "rounded",
                            "bg-[#1e1e1ebf]",
                            "text-white",
                            "border-solid",
                            "border-2",
                            "border-[#1e1e1ebf]",
                            "transition duration-150"
                        ].join(" ").trim()}
                        style={{
                            transform: "scale(.98) translate(0, -20px)",
                            opacity: 0.5,
                            maxHeight: maxListHeight,
                            ...listStyles
                        }}
                    >
                        {options.map((option, i) => (
                            <li
                                className={[
                                    option.value === value?.value ? "bg-[#2e2e2e] text-[#d200fa]" : "",
                                    selectedIndex === i ? "bg-[#2e2e2e] text-[#d200fa]" : "",
                                    "cursor-pointer",
                                    "select-none",
                                    "p-1",
                                ].join(" ").trim()}
                                value={option.value}
                                style={listItemStyles}
                                onClick={e => handleClickItem(option)}
                                onMouseEnter={() => handleSelectedIndex(i)}
                                onMouseLeave={() => handleSelectedIndex(null)}
                                key={option.label}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                }
            </div>
            {label &&
                <span
                    className={[
                        value ? classes["input-label"] : classes["empty-input-label"],
                        splittedSizes[1],
                        splittedSizes[3],
                        "select-none",
                        "-left-[98%]",
                        "cursor-text",
                        "text-[#ffffff80]",
                        "absolute",
                        "pointer-events-none",
                        "transition duration-200"
                    ].join(" ")}
                >
                    {label}
                </span>
            }
        </label>
    )
})
