import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	head: {
		script: [
			process.env.VERCEL_ENV === 'production'
				? {
						src: '/cheeseburger.js',
						defer: true,
						'data-cf-beacon': `{"token": "${process.env.CLOUDFLARE_ANALYTICS_TOKEN}"}`,
				  }
				: {},
		],
	},

	modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase'],
})
