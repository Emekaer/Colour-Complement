export const SET_COLOR ="SET_COLOR";
export const RESET_COLOR = "RESET_COLOR"

export const setColor=color=>{return({type: SET_COLOR, color: color })}

export const resetColor=()=>{return({type: RESET_COLOR})}