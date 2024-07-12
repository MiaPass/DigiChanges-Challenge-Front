import { ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
	palette: {
		mode: "dark",
		primary: {
			main: "#80deea",
		},
		secondary: {
			main: "#fff59d",
		},
		background: {
			default: "#000000",
			paper: "#1e2243",
		},
	},
	typography: {
		fontFamily: "Bahnschrift",
		fontWeightRegular: 400,
		fontWeightLight: 300,
		fontSize: 14,
		fontWeightBold: 700,
		htmlFontSize: 18,
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					scrollbarColor: "#6b6b6b #2b2b2b",
					"&::-webkit-scrollbar, & *::-webkit-scrollbar": {
						backgroundColor: "#2b2b2b",
					},
					"&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
						borderRadius: 8,
						backgroundColor: "#6b6b6b",
						minHeight: 24,
						border: "3px solid #2b2b2b",
					},
					"&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
						{
							backgroundColor: "#959595",
						},
				},
			},
		},
	},
};
