/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				brand: '#dc5f00',
				body: '#e8e9eb',
				light: '#e0dfd5',
				darkGray: '#313638',
				darkBlue: '#001524',
			},
		},
	},
	plugins: [],
};
