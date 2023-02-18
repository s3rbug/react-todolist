import { forwardRef, HTMLProps, Ref } from "react"

type PropsType = {}

export const BorderlessInput = forwardRef(
	(
		props: PropsType & HTMLProps<HTMLInputElement>,
		ref: Ref<HTMLInputElement>
	) => {
		return (
			<input
				{...props}
				ref={ref}
				type="text"
				style={{ ...props.style, border: "none", outline: "none" }}
			/>
		)
	}
)
