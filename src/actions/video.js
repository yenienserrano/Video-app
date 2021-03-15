import { types } from "../types/types";

export const videoStartLoaded = () => {
  return async (dispatch) => {
    const resp = await fetch(
      "https://run.mocky.io/v3/93018145-28fc-4c92-a347-0118720d3ccd"
    );
    const data = await resp.json();

    const [{ videos }] = data.categories;

    dispatch(videoLoaded(videos));
  };
};

const videoLoaded = (videos) => ({
  type: types.loadingVideos,
  payload: videos,
});

export const vidoeActivo = (video) => ({
  type: types.chooseVideo,
  payload: video,
});