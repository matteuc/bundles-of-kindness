import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import "../../utils/flowHeaders.min.css";
import "./main.css";
import { Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  gridPaper: {
    padding: theme.spacing(2),
    textAlign: 'center'
  }
}));

function Sponsors() {
  const classes = useStyles();

  return (
    <>
        <Grid container spacing={3}>
        <Paper elevation={1} className={classes.gridPaper}> Message about donations </Paper>


        </Grid>
        {/* GridList of all company sponsor logos */}
        {/* <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {tileData.map(tile => (
          <GridListTile key={tile.img} cols={tile.cols || 1}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList> */}

    </>

  );
}

export default Sponsors;
