// External Dependencies
import * as React from "react";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from "clsx";

// Local Dependencies
// ...

// interface Props {
//     text?: string, // Text to show
//     fade?: boolean, // Fade text at bottom of element
//     fontSize?: number, // Size of font
//     lineHeight?: number, // Line height
//     linesToShow?: number, // Lines to show
//     Container?: React.FC<any>
// }

// Text Container that detects overflow, replacing overflowed text with an ellipsis and providing the full text with a tooltip if specified
const SafeMultilineOverflowText = ({ Container, fade = true, text, fontSize = 16, lineHeight = 1.43, linesToShow = 3 }) => {
    
    const maxHeight = fontSize * linesToShow * lineHeight
    const useStyles = makeStyles((theme) => createStyles({
        fade: {
            display: "block",
            position: "relative",
            "&::after": {
                position: "absolute",
                zIndex: 1,
                bottom: 0,
                left: 0,
                pointerEvents: "none",
                backgroundImage: `linear-gradient(to bottom, rgba(255,255,255, 0), ${theme.palette.background.default} 90%)`,
                width: "100%",
                height: `${lineHeight * 2}rem`,
                content: "close-quote"
            }
        },
        root: {
            maxHeight: `${maxHeight}px`,
            width: "100%",
            fontSize: `${fontSize}`,
            lineHeight: `${lineHeight}`,
            overflow: "hidden",
            textOverflow: "ellipsis",
            wordBreak: "break-word"
        }
    }));

    const elRef = React.createRef()
    const classes = useStyles()
    

    const [overflow, setOverflow] = React.useState(false)
    React.useEffect(() => {
        if (elRef.current) {
            if (elRef.current.offsetHeight > maxHeight) setOverflow(true);
        }

    }, [elRef])

    return (
        <>
        {
            Container ?
            <Container className={clsx((fade && overflow) ? classes.fade : "", classes.root)}/>
            :

                <span className={clsx((fade && overflow) ? classes.fade : "", classes.root)} ref={elRef}>
                    {text || ""}
                </span>
                }
        </>
    )
}

export default SafeMultilineOverflowText;
