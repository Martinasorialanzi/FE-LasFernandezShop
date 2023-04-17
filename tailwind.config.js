/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,jsx,ts,tsx}",

		// Path to the tremor module
		"./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
	],
	prefix: 'tw-',
	theme: {
		extend: {},
	},
	corePlugins: {
        preflight: false,
    },
	plugins: [],
};
