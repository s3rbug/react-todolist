import React, { forwardRef, Ref } from "react";

type PropsType = {};

const BorderlessInput = forwardRef(
	(
		props: PropsType & React.HTMLProps<HTMLInputElement>,
		ref: Ref<HTMLInputElement>
	) => {
		return (
			<input
				{...props}
				ref={ref}
				type="text"
				style={{ ...props.style, border: "none", outline: "none" }}
			/>
		);
	}
);

export default BorderlessInput;
