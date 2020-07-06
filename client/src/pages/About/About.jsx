import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from "react-responsive";
import API from "../../utils/API";

import "../../utils/flowHeaders.min.css";
import { Grid, Paper, Typography } from "@material-ui/core";

import Spinner from "../../components/Spinner";

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

function About() {
    const classes = useStyles();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const { data } = await API.getPage("5efcbf6a32979cd8d2b4c2fd")

            PAGE_DESCRIPTION = data[0].PAGE_DESCRIPTION

            setLoading(false)

        }
        fetch()
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
                <Grid item xs={10} md={7} lg={5}>
                    {/* PAGE TITLE */}
                    <h3 className="flow-text" >
                        <Paper elevation={0} className={classes.paper}> About Us <img alt="Heart GIF" src="https://media3.giphy.com/media/Lqx1czoPLTQg3I68d1/giphy.gif?cid=790b76115ba9aee006629b4d81ee0e4da1c15596b742b06f&rid=giphy.gif" style={{ height: "1em", verticalAlign: "text-top" }} /> </Paper>
                    </h3>
                    {/* PAGE DESCRIPTION */}
                    <Typography color="primary" variant="body1">
                        {PAGE_DESCRIPTION}
                    </Typography>


                </Grid>

            </Grid>

        </>

    );
}

export default About;
