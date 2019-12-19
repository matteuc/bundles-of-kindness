import React from "react";
import { GridList, GridListTile } from "@material-ui/core";
// import { makeStyles } from '@material-ui/core/styles';
import { buildUrl } from "react-instafeed";
import "../../utils/hover.min.css";
import "./main.css";

import useAbortableFetch from './useAbortableFetch'

// import scrapeFeed from "./scrapeFeed.js";

// const useStyles = makeStyles(theme => ({

// }));


const InstaFeedGrid = (props) => {
    // const classes = useStyles();
    const options = {
        accessToken: props.token,
        clientId: '924f677fa3854436947ab4372ffa688d',
        get: 'user', // popular, user
        resolution: 'standard_resolution', // thumbnail, low_resolution, standard_resolution
        sortBy: 'most-recent', // none, least-commented, least-liked, least-recent, most-commented, most-liked, most-recent, random
        tagName: null,
        userId: props.token.split(".")[0],
        limit: props.limit,
    }
    const { json, loading, error } = useAbortableFetch(buildUrl(options))
    if (loading) return 'Loading...'
    if (error) return `Error: ${error}`
    if (!json) return null

    const { data } = json

    return (
        <>

            <GridList cellHeight={props.postHeight} style={{ width: props.width, height: props.height, padding: 0 }} cols={3}>
                {data.map(({ images, link, type }, index) => {
                    const image = images[options.resolution];
                    return (

                        <a target="_blank" rel="noopener noreferrer" key={index} href={link} >
                            <GridListTile cols={1} className="post-tile hvr-reveal" style={{ overflow: "hidden", backgroundImage: `url(${image.url})`, backgroundSize: "cover", backgroundPosition: "center center", backgroundRepeat: "no-repeat" }}>

                            </GridListTile>
                        </a>

                    )
                })}
            </GridList>

        </>
    );
}

export default InstaFeedGrid;