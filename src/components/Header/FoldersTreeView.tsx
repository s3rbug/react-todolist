import React from "react";
import { Button } from "@material-ui/core";
import { randomColor } from "../../utils/helpers";

type PropsType = {
	toggleTheme: () => void;
	addTag: (name: string, color: string) => void;
};

const FoldersTreeView = ({ toggleTheme, addTag }: PropsType) => {
	const handleAddTag = () => {
		addTag("name", randomColor());
	};
	return (
		<div>
			<Button onClick={toggleTheme}>Toggle theme</Button>
			<Button onClick={handleAddTag}>Add tag</Button>
		</div>
	);
};

export default FoldersTreeView;
