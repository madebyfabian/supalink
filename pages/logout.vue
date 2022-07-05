<template>
	<div></div>
</template>

<script setup>
	definePageMeta({
		middleware: 'auth',
	})

	const router = useRouter()
	const supabase = useSupabaseClient()

	onMounted(async () => {
		await supabase.auth?.signOut()
		await nextTick()
		return router.push('/')
	})
</script>
