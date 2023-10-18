import {
	DefaultMantineColor,
	MantineSize,
	MantineSizes,
	MantineTheme,
} from "@mantine/core";
import { clamp } from "@mantine/hooks";

export const theme: MantineTheme = {

	fontFamily: "__Lexend_dd5b7f, __Lexend_Fallback_dd5b7f",

	fontSizes: {
		xs: "12px",
		sm: "14px",
		md: "16px",
		lg: "18px",
		xl: "20px",
		"2xl": "24px",
		"3xl": "30px",
		"4xl": "36px",
		"5xl": "48px",
		"6xl": "60px",
		"7xl": "72px",
	},

	// @ts-ignore
	shadows: {
		"light-shadow-1": "0px 0px 10px rgba(73, 84, 101, 0.08)",
		"light-shadow-2": "0px 0px 10px rgba(73, 84, 101, 0.12)",
		"light-shadow-3": "0px 0px 10px rgba(73, 84, 101, 0.16)",
		"light-shadow-4": "0px 0px 10px rgba(73, 84, 101, 0.2)",
		"light-shadow-5": "0px 0px 10px rgba(73, 84, 101, 0.24)",
		"dark-shadow-1": "0px 0px 10px rgba(37, 8, 110, 0.08)",
		"dark-shadow-2": "0px 0px 10px rgba(37, 8, 110, 0.12)",
		"dark-shadow-3": "0px 0px 10px rgba(37, 8, 110, 0.16)",
		"dark-shadow-4": "0px 0px 10px rgba(37, 8, 110, 0.2)",
		"dark-shadow-5": "0px 0px 10px rgba(37, 8, 110, 0.24)",
	},

	radius: {
		"btn-radius": "80px",
		"center-block-radius": "40px",
		"card-radius": "16px",
		"dropdown-radius": "8px",
		"input-radius": "6px",
	} as any,

	breakpoints: {
		xs: "30em",
		sm: "48em",
		md: "64em",
		lg: "74em",
		xl: "90em",
	},

	globalStyles: (theme) => ({
		body: {
			backgroundColor: "#181818",
		},

		div: {
			[`@media (max-width: ${theme.breakpoints.xl})`]: {
				fontSize: clamp(
					parseInt(theme.fontSizes.md),
					1.5,
					parseInt(theme.fontSizes.md)
				),
			},

			[`@media (max-width: ${theme.breakpoints.lg})`]: {
				fontSize: clamp(
					parseInt(theme.fontSizes.sm),
					1.5,
					parseInt(theme.fontSizes.sm)
				),
			},
		},
	}),
};
