/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				PWBlack: '#141414',
				PWWhite: "#F0F0F0",
				PWOlive: "#BCCABC",
				PWRed: {
					500: "#CE4B6D",
					600: "#C8375D",
					700: "#8F2743"
				},
				PWBlue: {
					500: "#37ADC8",
					600: "#2498B3",
				},
				PWYellow: {
					400: "#FFD71A",
					500: "#e9c41a",
					600: "#E6BD00"
				},
				PWGreen: {
					400: "#7ACD86",
					500: "#6BC779",
					600: "#6BC779"
				}
			},
			fontFamily: {
				notoSerifDisplay: ["Noto Serif Display"],
				notoSerif: ["Noto Serif"],
			},
			// Source for scroller: https://www.youtube.com/watch?v=iLmBy-HKIAw. Current implementation requires duplication of elements
			// consider implementing version without duplication, using javascript
			animation: {
				hori_scroll_L2R: "hori_scroll_L2R 40s linear infinite",
				hori_scroll_R2L: "hori_scroll_R2L 40s linear infinite",
			},
			keyframes: {
				/* rem for accounting for gap between in beginning and ending states states. Derived by zooming in (yes, really)*/
				hori_scroll_L2R: {
					"0%":{transform: "translateX(calc(-50% - 5.5px))"},
					"100%": {transform: "translateX(0%)"}
				},
				hori_scroll_R2L: {
					"0%": {transform: "translateX(0%)"},
					"100%": {transform: "translateX(calc(-50% - 5.5px))"}
				},
				articleCardFocus: {
					"0%": {},
					"100%": {"position": "relative"}
				}
			},
			screens: {
				"xs": "",
				"sm": "650px",
				"md": "1020px",
				"lg": "1500px",
			},
		},
	},
	plugins: [],
}
