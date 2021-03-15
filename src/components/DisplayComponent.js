import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CircularProgress,
  Container,
  Grid,
  Typography,
  CardMedia,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { videoStartLoaded } from "../actions/video";
import { ControlsComponent } from "./ControlsComponent";

const useStyles = makeStyles({
  loading: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  titleApp: {
    marginTop: 10,
    marginBottom: 10,
  },
  containerMain: {
    backgroundColor: "#fff",
  },
  container: {
    display: "flex",
    width: "100%",
  },
  video: {
    height: "auto",
    padding: 20,
    filter: (props) =>
      `brightness(${props.brightness}) contrast(${props.contrast})`,
  },
  description: {
    padding: 20,
  },
  titleVideo: {
    paddingTop: 20,
  },
});

export const DisplayComponent = () => {
  const props = useSelector((state) => state.controls);
  const { loading, videoActivo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const [video, setVideo] = useState();
  const classes = useStyles(props);

  setTimeout(() => {
    setVideo(document.querySelector("video"));
  }, 100);

  useEffect(() => {
    dispatch(videoStartLoaded());
  }, [dispatch]);

  if (loading) {
    return (
      <Container className={classes.loading}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth={false} className={classes.containerMain}>
      <Container>
        <Typography
          className={classes.titleApp}
          variant="h3"
          component="h1"
          align="center"
        >
          Videos App
        </Typography>

        {videoActivo && (
          <Grid container className={classes.container} spacing={2}>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="video"
                align="left"
                className={classes.video}
                poster={videoActivo.thumb}
                src={videoActivo.sources[0]}
                title={videoActivo.title}
              />
            </Grid>
            <Grid item xs={12} md={6} align="center">
              <Typography
                variant="h5"
                component="h3"
                align="center"
                className={classes.titleVideo}
              >
                {videoActivo.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.description}
              >
                {videoActivo.description}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Container>
      <ControlsComponent videoActivo={video} />
    </Container>
  );
};
