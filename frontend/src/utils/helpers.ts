import { useSpring, config } from "react-spring";

export const randomColor = (): string => {
	const letters = "0123456789ABCDEF";
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

export const isDevelopment = (): boolean => {
	return !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
}