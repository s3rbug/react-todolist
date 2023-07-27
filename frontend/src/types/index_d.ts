declare module "@mui/material/styles/createPalette" {
	interface Palette {
		chip: React.CSSProperties["color"]
	}
	interface PaletteOptions {
		chip: React.CSSProperties["color"]
	}
}

export type ObjectCssType = {
	[key: string]:
		| {
				[key: string]: string | undefined
		  }
		| undefined
}
