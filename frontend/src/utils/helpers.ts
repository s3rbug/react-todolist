import { useSpring, config } from "react-spring";

export const random = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomColor = () => {
	let letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; ++i) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

export const stringAfterSymbol = (string: string, symbol: string): string => {
	const indexOfSymbol = string.indexOf(symbol)
	if(indexOfSymbol)
		return string.slice(indexOfSymbol + 1)
	else 
		return ""
}

export const useAnimatedExpand = (isAnimated: boolean) => {
	return useSpring({
		transform: isAnimated ? "rotateX(0deg)" : "rotateX(180deg)",
		config: config.stiff,
	});
};

export const filledArray = <T extends any> (countElements: number, value: T) => {
	return Array(countElements).fill(value);
};
