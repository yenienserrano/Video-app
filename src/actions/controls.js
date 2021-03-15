import { types } from "../types/types"

export const controlBrightness = ( brightness ) => ({
    type: types.controlBrightness,
    payload: brightness
})

export const controlContrast = ( contrast ) => ({
    type: types.controlContrast,
    payload: contrast
})
