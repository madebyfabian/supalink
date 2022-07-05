<template>
	<div class="max-w-md mx-auto">
		<div v-if="!pending">
			<div v-if="!error" class="text-center mt-8 tablet:mt-20">
				<Alert v-if="$route.query.preview === 'true'" alertType="error" class="mb-8">
					This is only the preview URL. Views on here will not be counted.
				</Alert>

				<h1 class="h2-like">🚀 You're getting redirected in a sec</h1>
				<p class="mt-2 text-gray-400">{{ data.data.url }}</p>
			</div>

			<div v-else>
				<Alert alertType="error">There was an error with this Link. Maybe you're too late!</Alert>
			</div>
		</div>

		<div v-else class="text-center">Loading...</div>
	</div>
</template>

<script setup>
	const route = useRoute()

	const { data, pending, error } = await useAsyncData(
		'count',
		() =>
			$fetch('/api/validateAndCountLink', {
				method: 'post',
				body: {
					shortcode: route.params.linkShortcode,
					preview: route.query.preview === 'true',
				},
			}),
		{ server: false }
	)

	watchEffect(() => {
		if (route.query.preview === 'true' || process.server || !data) return

		setTimeout(() => {
			window.location.href = data.value.data.url
		}, 2000)
	})

	definePageMeta({
		title: '🚀 You’re getting redirected in a sec',
	})
</script>
