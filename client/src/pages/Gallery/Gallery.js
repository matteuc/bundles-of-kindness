import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from "react-responsive";
import API from "../../utils/API";

import "../../utils/flowHeaders.min.css";
import { Grid, GridList, GridListTile, Paper, Typography } from "@material-ui/core";

import Spinner from "../../components/Spinner";

import "./main.css";

import { ACCENT_COLOR } from "../../utils/colors";


const useStyles = makeStyles(theme => ({
  gridPaper: {
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: ACCENT_COLOR,
    fontFamily: "Lilita One, cursive"
  }
}));

let PAGE_DESCRIPTION, ALBUM_ID;

function Gallery() {
  const classes = useStyles();
  const [photos, setPhotos] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    API.getPage("5e16d2c3703b64d92fa95ede")
    .then((contentObj) => {
      ({PAGE_DESCRIPTION, ALBUM_ID} = contentObj.data[0]);
      
      API.getAlbumPhotos(ALBUM_ID)
        .then((pObj) => {
          if (pObj) {
            setPhotos(pObj.data);
          }
          setLoading(false);
        });
    });

  }, [])



  if (loading) {
    return (
      <div style={{ minHeight: "100%", width: "100%", position: "absolute", backgroundColor: "snow" }}>
        {
          loading ?
            <Spinner value="Loading..." src={"https://media0.giphy.com/media/xUOxf7gg8AztZMfyMM/source.gif"} color={ACCENT_COLOR} />
            : ""
        }
      </div>
    )
  }

  return (
    <>
      {/* PAGE HEADER */}
      <Grid container justify="center">
        <Grid item xs={10} md={8} lg={6}>
          {/* PAGE TITLE */}
          <h3 className="flow-text" >
            <Paper elevation={0} className={classes.paper}> Photos <img alt="Heart GIF" src="https://media3.giphy.com/media/Lqx1czoPLTQg3I68d1/giphy.gif?cid=790b76115ba9aee006629b4d81ee0e4da1c15596b742b06f&rid=giphy.gif" style={{ height: "1em", verticalAlign: "text-top" }} /> </Paper>
          </h3>
          {/* PAGE DESCRIPTION */}
          <Typography color="primary" align="center" variant="body1">
            {PAGE_DESCRIPTION}
          </Typography>


        </Grid>

      </Grid>


          <div className="row">

          <div className="column">
              {photos.slice(0, (photos.length / 4)).map((src, index) => (
                <img style={{ width: "100%"}} src={src} key={"Image: " + src} alt={"Image: " + src} className="photo-tile hvr-reveal" />
              )
              )}
            </div>
            <div className="column">
              {photos.slice((photos.length / 4), (photos.length / 4) * 2).map((src, index) => (
                <img style={{ width: "100%"}} src={src} key={"Image: " + src} alt={"Image: " + src} className="photo-tile hvr-reveal"/>
              )
              )}
            </div>
            <div className="column">
              {photos.slice((photos.length / 4) * 2, (photos.length / 4) * 3).map((src, index) => (
                <img style={{ width: "100%"}} src={src} key={"Image: " + src} alt={"Image: " + src} className="photo-tile hvr-reveal"/>
              )
              )}
            </div>
            <div className="column">
              {photos.slice((photos.length / 4) * 3).map((src, index) => (
                <img style={{ width: "100%"}} src={src}  key={"Image: " + src} alt={"Image: " + src} className="photo-tile hvr-reveal"/>
              )
              )}
            </div>
          </div>

    </>

  );
}

export default Gallery;
