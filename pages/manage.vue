<template>
	<div>
		<div v-if="!error">
			<h1>Your Links</h1>
			<ul>
				<li v-for="link of links">
					<NuxtLink :to="`/l/${link.shortcode}`">Goes to {{ link.url }}</NuxtLink>
				</li>
			</ul>
		</div>
		<div v-else>Something went wrong...</div>
	</div>
</template>

<script setup>
	definePageMeta({
		middleware: 'auth',
	})

	const supabase = useSupabaseClient()
	const user = useSupabaseUser()

	const { data: links, error } = await supabase.from('links').select('*').eq('user_id', user.value.id)
</script>
