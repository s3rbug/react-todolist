import React from "react";
import {
	makeStyles,
	Theme,
	StyleRules,
	Typography,
	Divider,
	useTheme,
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/FolderOutlined";

const useStyles = makeStyles(
	(theme: Theme): StyleRules<string> => ({
		root: {
			display: "flex",
			background: theme.palette.background.paper,
			marginLeft: "30px",
			marginRight: "80px",
			marginTop: "10px",
			borderRadius: "100px",
			height: "35px",
			padding: "7px",
			alignItems: "center",
		},
		text: {
			marginRight: "20px",
		},
		divider: {
			marginRight: "20px",
		},
		test: {
			display: "inline-block",
		},
		icon: {
			marginRight: "2px",
			"&:hover": {
				color: theme.palette.primary.main,
			},
		},
	})
);

type PropsType = {
	headline: string;
	folderId: number;
};

const FolderLabel = ({ headline, folderId }: PropsType) => {
	const classes = useStyles();
	const theme = useTheme();
	return (
		<div className={classes.test}>
			<div className={classes.root}>
				<Typography variant="h5" className={classes.text}>
					{headline}
				</Typography>
				<Divider
					orientation="vertical"
					className={classes.divider}
					style={{ background: theme.palette.divider, width: "1px" }}
				/>
				<FolderIcon className={classes.icon} />
			</div>
		</div>
	);
};

export default FolderLabel;
