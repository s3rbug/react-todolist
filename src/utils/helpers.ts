import { useSpring, config } from "react-spring";
import { useCallback, Ref } from "react";

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

export const getIntSecondPart = (str: string, symbol: string): number => {
	return parseInt(str.split(symbol)[1]);
};

export const useCombinedRefs = <T extends any>(
	...refs: ReadonlyArray<Ref<T>>
): Ref<T> =>
	useCallback(
		(element: T) =>
			refs.forEach((ref) => {
				if (!ref) {
					return;
				}
				// Ref can have two types - a function or an object. We treat each case.
				if (typeof ref === "function") {
					return ref(element);
				}
				// As per https://github.com/facebook/react/issues/13029
				// it should be fine to set current this way.
				(ref as any).current = element;
			}),
		[refs]
	);

export const useAnimatedExpand = (isAnimated: boolean) => {
	return useSpring({
		transform: isAnimated ? "rotate(0deg)" : "rotate(-90deg)",
		config: config.stiff,
	});
};

export const useAnimatedArrow = (isAnimated: boolean) => {
	return useSpring({
		to: [
			{
				transform: isAnimated ? "translateY(0px)" : "translateY(-10px)",
				immediate: false,
			},
			{
				transform: isAnimated ? "translateY(0px)" : "translateY(20px)",
				immediate: true,
			},
			{
				transform: "translateY(0px)",
				immediate: false,
			},
		],
	});
};

export const filledArray = <T extends any>(countElements: number, value: T) => {
	return Array(countElements).fill(value);
};
