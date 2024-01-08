import { PieceStatus } from "../game"

export function Piece (props: { 
    id?: any, 
    disabled?: boolean, 
    status?: PieceStatus, 
    ariaLabel: string, 
    tabIndex?: number,
    onPress?: () => void 
}) {
    const attributes = {
        id: props.id,
        className: `piece ${props.status} ${props.disabled ? "disabled" : ""}`,
        disabled: props.disabled,
        "aria-label": props.ariaLabel,
        role: props.onPress ? "button" : "region",
        tabIndex: props.tabIndex !== undefined ? props.tabIndex : -1,
        onClick: props.onPress
    };
    
    
    return props.onPress ? <button {...attributes}></button> : <div {...attributes}></div>;
}