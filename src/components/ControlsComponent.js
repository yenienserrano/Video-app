import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Icon,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Slider,
  Card,
} from "@material-ui/core";
import { vidoeActivo } from "../actions/video";
import { controlBrightness, controlContrast } from "../actions/controls";

const useStyles = makeStyles({
  root: {
    margin: 15,
  },
  media: {
    height: 140,
  },
  videos: {
    display: "flex",
    flexWrap: "wrap",
  },
  gridContainer: {
    flex: 1,
  },
  controlsVideo: {
    position: "absolute",
    top: 100,
    left: 5,
  },
  descriptionVideo: {
    height: 200,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
}
});

export const ControlsComponent = ({ videoActivo }) => {
  const [showVolumen, setShowVolumen] = useState(false);
  const [showBrightness, setShowBrightness] = useState(false);
  const [showContrast, setShowContrast] = useState(false);
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

  const handlePlay = (e) => {
    videoActivo.play();
  };
  const handleStop = () => {
    videoActivo.pause();
  };
  const handleVolumen = () => {
    setShowVolumen(!showVolumen);
  };
  const handleBrightness = () => {
    setShowBrightness(!showBrightness);
  };
  const handleContrast = () => {
    setShowContrast(!showContrast);
  };

  return (
    <>
      {videoActivo && (
        <Grid
          container
          direction="column"
          className={classes.controlsVideo}
          spacing={2}
        >
          <Grid item xs={2}>
            <Button size="small" color="primary">
              <Icon
                className="fas fa-play-circle"
                color="primary"
                onClick={handlePlay}
              ></Icon>
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button size="small" color="primary">
              <Icon
                className="fas fa-pause-circle"
                color="primary"
                onClick={handleStop}
              ></Icon>
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button size="small" color="primary">
              <Icon
                className="fas fa-volume-up"
                color="primary"
                onClick={handleVolumen}
              ></Icon>
            </Button>
          </Grid>
          {showVolumen && (
            <Grid item xs={2}>
              <Grid item xs={8} ms={6} md={3}>
                <Slider
                  value={volumen}
                  onChange={handleChangeVolumen}
                  aria-labelledby="continuous-slider"
                />
              </Grid>
            </Grid>
          )}
          <Grid item xs={2}>
            <Button size="small" color="primary">
              <Icon
                className="fas fa-sun"
                color="primary"
                onClick={handleBrightness}
              ></Icon>
            </Button>
          </Grid>
          {showBrightness && (
            <Grid item xs={2}>
              <Grid item xs={8} ms={6} md={3}>
                <Slider
                  value={brightness}
                  onChange={handleChangeBrightness}
                  aria-labelledby="continuous-slider"
                />
              </Grid>
            </Grid>
          )}
          <Grid item xs={2}>
            <Button size="small" color="primary">
              <Icon
                className="fas fa-adjust"
                color="primary"
                onClick={handleContrast}
              ></Icon>
            </Button>
          </Grid>
          {showContrast && (
            <Grid item xs={2}>
              <Grid item xs={8} ms={6} md={3}>
                <Slider
                  value={contrast}
                  onChange={handleChangeContrast}
                  aria-labelledby="continuous-slider"
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
      <Container>
        {videoActivo ? (
          <Typography gutterBottom align="center" variant="h3" component="h2">
            Otros videos
          </Typography>
        ) : null}
        <Container className={classes.videos}>
          <Grid container className={classes.gridContainer}>
            {videos.map((video) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={video.title}>
                  <Card
                    className={classes.root}
                    onClick={() => handleChangeVideoActive(video)}
                  >
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={video.thumb}
                        title={video.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
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
                        color="primary"
                        onClick={() => handleChangeVideoActive(video)}
                      >
                        Ver video
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
