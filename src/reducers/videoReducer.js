import { types } from "../types/types";

const initialState = {
  videos: [],
  videoActivo: null,
  loading: true,
};

export const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.loadingVideos:
      return {
        ...state,
        videos: [...action.payload],
        loading: false,
      };

    case types.chooseVideo:
      return {
        ...state,
        videoActivo: action.payload,
      };

    default:
      return state;
  }
};
