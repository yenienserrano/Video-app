import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ReactPlayer from "react-player";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { removeVideoActivo, videoStartLoaded } from "../actions/video";
import { ControlsComponent } from "./ControlsComponent";

const useStyles = makeStyles({
  loading: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  navbar: {
    backgroundColor: "#202020",
    width: "100%",
  },
  titleApp: {
    marginTop: 10,
    marginBottom: 10,
  },
  containerMain: {
    backgroundColor: "#151515",
    color: "#fff",
    padding: 0,
  },
  container: {
    display: "flex",
    width: "100%",
    backgroundColor: "#333333",
  },
  video: {
    height: "auto",
    filter: (props) =>
      `brightness(${props.brightness}) contrast(${props.contrast})`,
  },
  titleVideo: {
    paddingTop: 20,
  },
  description: {
    paddingTop: 20,
    paddingBottom: 20,
    color: "#fff",
  },
  btnBack: {
    color: "#fff",
    position: "absolute",
    top: 70,
    right: -15,
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

  const handleRemoveVideo = () => {
    dispatch(removeVideoActivo());
  };

  if (loading) {
    return (
      <Container className={classes.loading}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth={false} className={classes.containerMain}>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Videos
          </Typography>
        </Toolbar>
      </AppBar>
      {videoActivo && (
        <Container maxWidth={false} className={classes.container}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Container maxWidth="md">
                <ReactPlayer
                  className={classes.video}
                  width="100%"
                  height="100%"
                  url={videoActivo.sources[0]}
                  playing
                />
              </Container>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h5"
                component="h3"
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
              <Button className={classes.btnBack} onClick={handleRemoveVideo}>
                <CloseIcon />
              </Button>
            </Grid>
          </Grid>
        </Container>
      )}
      <ControlsComponent videoActivo={video} />
    </Container>
  );
};
