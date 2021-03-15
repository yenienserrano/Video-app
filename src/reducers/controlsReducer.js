import { types } from "../types/types";

const initialState = {
  brightness: "100%",
  contrast: "100%",
};

export const controlsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.controlBrightness:
      return {
        ...state,
        brightness: action.payload / 100,
      };
    case types.controlContrast:
      return {
        ...state,
        contrast: `${action.payload}%`,
      };

    default:
      return state;
  }
};
