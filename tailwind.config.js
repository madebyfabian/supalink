const defaultTheme = require('tailwindcss/defaultTheme') // eslint-disable-line
const colors = require('tailwindcss/colors') // eslint-disable-line

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		`components/**/*.{vue,js,ts}`,
		`layouts/**/*.vue`,
		`pages/**/*.vue`,
		`composables/**/*.{js,ts}`,
		`plugins/**/*.{js,ts}`,
		`App.{js,ts,vue}`,
		`app.{js,ts,vue}`,
	],

	theme: {
		container: {
			center: true,
			padding: {
				'DEFAULT': '1rem',
				'mobile': '1rem',
				'tablet': '1.5rem',
			},
		},

		screens: {
			'mobile': '426px',
			'tablet': '768px',
			'desktop': '1024px',
			'mouse-only': { raw: '(pointer: fine)' },
			'touch-only': { raw: '(pointer: coarse)' },
		},

		fontFamily: {
			'display': ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans],
		},

		extend: {
			zIndex: {
				'60': '60',
			},
			spacing: {
				'auto': 'auto',
				'inherit': 'inherit',
			},
			colors: {
				'primary': colors.teal[300],
			},
		},
	},
}
