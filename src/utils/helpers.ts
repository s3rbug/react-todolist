export const combineStyles = (styles: Array<string>) => {
	return styles.reduce((style, cur) => style + " , " + cur);
};

export const random = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomColor = () => {
	let letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; ++i) color += letters[Math.floor(Math.random() * 16)];
	return color;
};

export const getIntSecondPart = (str: string, symbol: string): number => {
	return parseInt(str.split(symbol)[1]);
};
