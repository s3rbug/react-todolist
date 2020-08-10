import React, { useState } from "react";
import { makeStyles, StyleRules, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import { NavLink } from "react-router-dom";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles(
    (theme: Theme): StyleRules<string> => ({
        root: {
            width: "100%",
            height: "100%",
        },
        card: {
            display: "flex",
            flexDirection: "column",
            borderWidth: "2px",
            width: "100%",
            height: "100%",
            background: theme.palette.background.default,
        },
        link: {
            textDecoration: "none",
            color: theme.palette.text.primary,
            height: "100%",
        },
        shadow: {
            width: "100%",
            height: "100%",
        },
    })
);

type PropsType = {
    id: number;
    headline: string;
    description: string;
};

const Folder = ({ id, headline, description }: PropsType) => {
    const classes = useStyles();
    const [shadow, setShadow] = useState(2);

    const shadowOn = () => {
        setShadow(12);
    };

    const shadowOff = () => {
        setShadow(2);
    };

    return (
        <div className={classes.root}>
            <Box
                boxShadow={shadow}
                onMouseEnter={shadowOn}
                onMouseLeave={shadowOff}
                className={classes.shadow}
            >
                <Card variant="outlined" className={classes.card}>
                    <NavLink to={`/folders/${id}`} className={classes.link}>
                        <CardActionArea>
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h4"
                                    color="textPrimary"
                                >
                                    {headline}
                                </Typography>
                                <Typography
                                    color="textSecondary"
                                    variant="subtitle1"
                                >
                                    {description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </NavLink>
                </Card>
            </Box>
        </div>
    );
};

export default Folder;
