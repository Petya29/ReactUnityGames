import { IconBase } from ".";

export const XMarkIcon = ({ ...props }: IconBase.IconBaseProps) => {
    return (
        <IconBase.IconBase {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </IconBase.IconBase>
    )
}
