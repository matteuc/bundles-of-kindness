import React, { useEffect, useState } from "react";
import clsx from 'clsx';
import { GridList, GridListTile, Box } from "@material-ui/core";
import FAIcon from "../../components/FAIcon";
import { makeStyles } from '@material-ui/core/styles';
import { buildUrl } from "react-instafeed";
import "../../utils/hover.min.css";
import "./main.css";

// import useAbortableFetch from './useAbortableFetch'
import axios from "axios";

const useStyles = makeStyles(theme => ({
    centerElementParent: {
        display: "flex"
      },
      centerElement: {
        margin: "auto"
      },
}));

const RESOLUTION = "standard_resolution";

const InstaFeedGrid = (props) => {
    const [ feedData, setFeedData ] = useState([]);
    const [ paginationURL, setPaginationURL ] = useState();

    const classes = useStyles();

    const handleLoad = () => {
        axios.get(paginationURL)
        .then((result) => {
            const json = result.data
            const { data } = json;
            let { pagination } = json;
            
            setFeedData(feedData.concat(data));
            setPaginationURL(pagination.next_url);
        })      

    }

    useEffect(() => {
        const options = {
            accessToken: props.token,
            clientId: '924f677fa3854436947ab4372ffa688d',
            get: 'user', // popular, user
            resolution: RESOLUTION, // thumbnail, low_resolution, standard_resolution
            sortBy: 'most-recent', // none, least-commented, least-liked, least-recent, most-commented, most-liked, most-recent, random
            tagName: null,
            userId: props.token.split(".")[0],
            limit: props.initial,
        }
        
        axios.get(buildUrl(options))
        .then((result) => {
            const json = result.data
            const { data } = json;
            let { pagination } = json;
            
            // Change step count
            let paginationStepURL = pagination.next_url.replace(`count=${props.initial}`, `count=${props.step}`);

            setFeedData(data);
            setPaginationURL(paginationStepURL);
        })
     
      }, [])
    
    return (
        <>

            <GridList cellHeight={props.postHeight} style={{ margin: "0",width: props.width, height: props.height, padding: 0 }} cols={3}>
                
                {
                feedData.map(({ images, link, type }, index) => {
                    const image = images[RESOLUTION];
                    return (

                        <a target="_blank" rel="noopener noreferrer" key={index} href={link} >
                            <GridListTile cols={1} className="post-tile hvr-reveal" style={{ overflow: "hidden", backgroundImage: `url(${image.url})`, backgroundSize: "cover", backgroundPosition: "center center", backgroundRepeat: "no-repeat" }}>

                            </GridListTile>
                        </a>

                    )
                })}
            </GridList>
            <Box className={classes.centerElementParent} style={{ color: "grey", marginTop: "3em", marginBottom: "3em" }} >
                    <FAIcon onClick={() => handleLoad()} size="lg" name="ellipsis-h" solid className={clsx(classes.centerElement, "hvr-grow")} />
            </Box>


        </>
    );
}

export default InstaFeedGrid;