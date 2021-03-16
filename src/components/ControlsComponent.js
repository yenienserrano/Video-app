import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Slider,
  Card,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import Brightness6Icon from "@material-ui/icons/Brightness6";
import Brightness2SharpIcon from "@material-ui/icons/Brightness2Sharp";

import { vidoeActivo } from "../actions/video";
import { controlBrightness, controlContrast } from "../actions/controls";

const useStyles = makeStyles({
  root: {
    margin: 15,
  },
  media: {
    height: 140,
  },
  moreVideo: {
    margin: 20,
  },
  videos: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: 20,
    paddingBottom: 20,
  },
  gridContainer: {
    flex: 1,
  },
  controlsVideo: {
    position: "absolute",
    top: 70,
    left: 90,
    width: 250,
  },
  controlsVideoWidth: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  card: {
    backgroundColor: "#202020",
    color: "#fff",
    height: 390,
  },
  titleVideo: {
    height: 60,
  },
  descriptionVideo: {
    height: 100,
    textOverflow: "ellipsis",
    overflow: "hidden",
    color: "#fff",
    fontSize: 14,
  },
  menuContols: {
    backgroundColor: "#333333",
    width: 100,
  },
});

export const ControlsComponent = ({ videoActivo }) => {
  const [showVolumen, setShowVolumen] = useState(null);
  const [showBrightness, setShowBrightness] = useState(null);
  const [showContrast, setShowContrast] = useState(null);
  const [volumen, setVolumen] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const { videos } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChangeVolumen = (event, newValue) => {
    setVolumen(newValue);

    videoActivo.volume = volumen / 100;
  };

  const handleChangeBrightness = (event, newValue) => {
    setBrightness(newValue);

    dispatch(controlBrightness(brightness));
  };
  const handleChangeContrast = (event, newValue) => {
    setContrast(newValue);

    dispatch(controlContrast(contrast));
  };

  const handleChangeVideoActive = (video) => {
    dispatch(vidoeActivo(video));
    window.scrollTo(0, 0);
  };

  const handlePlay = () => {
    videoActivo.play();
  };
  const handleStop = () => {
    videoActivo.pause();
  };

  const handleBrightness = (event) => {
    setShowBrightness(event.currentTarget);
  };

  const handleContrast = (event) => {
    setShowContrast(event.currentTarget);
  };

  const handleVolumen = (event) => {
    setShowVolumen(event.currentTarget);
  };

  const handleClose = () => {
    setShowBrightness(null);
    setShowContrast(null);
    setShowVolumen(null);
  };

  return (
    <>
      {videoActivo && (
        <Grid
          container
          direction="row"
          className={classes.controlsVideo}
          spacing={2}
        >
          <Grid item xs={2}>
            <IconButton aria-label="play" size="small" onClick={handlePlay}>
              <PlayArrowIcon style={{ color: "white" }} />
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <IconButton size="small" onClick={handleStop}>
              <PauseIcon style={{ color: "white" }} />
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <IconButton size="small" onClick={handleVolumen}>
              <VolumeUpIcon style={{ color: "white" }} />
            </IconButton>
          </Grid>
          <Menu
            id="simple-menu"
            anchorEl={showVolumen}
            keepMounted
            open={Boolean(showVolumen)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={handleClose}
              style={{ background: "#333", width: 100 }}
            >
              <Slider
                className={classes.controlsVolumen}
                value={volumen}
                onChange={handleChangeVolumen}
                aria-labelledby="continuous-slider"
                style={{ color: "white" }}
              />
            </MenuItem>
          </Menu>
          <Grid item xs={2}>
            <IconButton size="small" onClick={handleBrightness}>
              <Brightness6Icon style={{ color: "white" }} />
            </IconButton>
          </Grid>
          <Menu
            id="simple-menu"
            anchorEl={showBrightness}
            keepMounted
            open={Boolean(showBrightness)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={handleClose}
              style={{ background: "#333", width: 100 }}
            >
              <Slider
                value={brightness}
                onChange={handleChangeBrightness}
                aria-labelledby="continuous-slider"
                style={{ color: "white" }}
              />
            </MenuItem>
          </Menu>
          <Grid item xs={2}>
            <IconButton size="small" onClick={handleContrast}>
              <Brightness2SharpIcon style={{ color: "white" }} />
            </IconButton>
          </Grid>
          <Menu
            id="simple-menu"
            anchorEl={showContrast}
            keepMounted
            open={Boolean(showContrast)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={handleClose}
              style={{ background: "#333", width: 100 }}
            >
              <Slider
                value={contrast}
                onChange={handleChangeContrast}
                aria-labelledby="continuous-slider"
                style={{ color: "white" }}
              />
            </MenuItem>
          </Menu>
        </Grid>
      )}
      <Container>
        {videoActivo && (
          <Typography
            gutterBottom
            variant="h5"
            component="h3"
            className={classes.moreVideo}
          >
            More videos
          </Typography>
        )}
        <Container className={classes.videos}>
          <Grid container className={classes.gridContainer} spacing={3}>
            {videos.map((video) => {
              return (
                <Grid item xs={12} sm={6} md={3} key={video.title}>
                  <Card
                    className={classes.card}
                    onClick={() => handleChangeVideoActive(video)}
                  >
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={video.thumb}
                        title={video.title}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          className={classes.titleVideo}
                        >
                          {video.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          className={classes.descriptionVideo}
                        >
                          {video.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        style={{ color: "white" }}
                        onClick={() => handleChangeVideoActive(video)}
                      >
                        See video
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Container>
    </>
  );
};
