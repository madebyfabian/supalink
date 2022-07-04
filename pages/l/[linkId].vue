<template>
	<div>
		<div v-if="!error">
			Hej!
			<pre>{{data}}</pre>
		</div>

		<div v-else>
			Error...
			<pre>{{error}}</pre>
		</div>
	</div>
</template>

<script setup>
	const supabase = useSupabaseClient()
	const route = useRoute()

	const { data, error } = await supabase.from('links').select('*').eq('shortcode', route.params.linkId).single()
</script>