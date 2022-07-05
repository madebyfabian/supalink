<template>
	<Head>
		<Link
			rel="icon"
			href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💚</text></svg>" />
	</Head>

	<Header />
	<main class="container py-8 tablet:py-12 grow">
		<NuxtPage />
	</main>
	<Footer />
</template>

<script setup>
	useHead({
		htmlAttrs: {
			lang: 'en',
		},
	})
</script>
