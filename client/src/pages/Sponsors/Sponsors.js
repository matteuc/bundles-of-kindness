import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from "react-responsive";

import "../../utils/flowHeaders.min.css";
import "./main.css";
import { Grid, GridList, GridListTile, Paper, Typography } from "@material-ui/core";
import { companies, PAGE_DESCRIPTION } from "./sponsorsData.js"

const useStyles = makeStyles(theme => ({
  gridPaper: {
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: "rgb(91, 39, 188)",
    fontFamily: "Lilita One, cursive"
  }
}));

function Sponsors() {
  const classes = useStyles();
  const isSmallSize = useMediaQuery({ query: '(max-width: 600px)' });
  const isMediumSize = useMediaQuery({ query: '(max-width: 960px)' });
  const isLargeSize = useMediaQuery({ query: '(max-width: 1280px)' });
  // const isExtraLargeSize = useMediaQuery({ query: '(max-width: 1920px)' });

  return (
    <>
      <Grid container justify="center">
        <Grid item xs={10} md={8} lg={6}>
          {/* PAGE TITLE */}
          <h3 className="flow-text" >
            <Paper elevation={0} className={classes.paper}> Our Supporters <img alt="Heart GIF" src="https://media3.giphy.com/media/Lqx1czoPLTQg3I68d1/giphy.gif?cid=790b76115ba9aee006629b4d81ee0e4da1c15596b742b06f&rid=giphy.gif" style={{ height: "1em", verticalAlign: "text-top" }} /> </Paper>
          </h3>
          {/* PAGE DESCRIPTION */}
          <Typography color="primary" align="center" variant="body1">
            {PAGE_DESCRIPTION}
          </Typography>


        </Grid>

      </Grid>
      <Grid container justify="center">
        <Grid item xs={12} lg={10} xl={8}>

          <GridList spacing={8} cellHeight="auto" style={{ width: "100%", height: "auto", padding: 0, marginTop: "2em" }} cols={isSmallSize ? 2 : isMediumSize ? 3 : isLargeSize ? 4 : 5}>
            {companies.map(({ src, name }, index) => (

              <GridListTile style={{ display: "flex" }} key={index} cols={1} >
                <span style={{ display: "flex", width: "100%", height: "100%" }}>
                  <img style={{ width: "50%", margin: "auto", height: "auto" }} src={src} alt={name + " logo"} />
                </span>
              </GridListTile>

            )
            )}
            {/* {data.individuals.map(({ name }, index) => (

              <GridListTile style={{ display: "flex" }} key={index} cols={1} >
                <span style={{ display: "flex", width: "100%", height: "100%" }}>
                  <Paper elevation={3} style={{ textAlign: "center", margin: "auto", border: "1px solid #8080803d", padding: "1em", width: "100%", color: ACCENT_COLOR }}> <strong>{name}</strong> </Paper>
                </span>
              </GridListTile>

            )
            )} */}
          </GridList>
        </Grid>

      </Grid>
    </>

  );
}

export default Sponsors;
