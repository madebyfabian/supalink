<template>
	<div></div>
</template>

<script setup>
	definePageMeta({
		middleware: 'auth',
	})

	const router = useRouter()
	const supabase = useSupabaseClient()

	onMounted(() => {
		try {
			supabase.auth?.signOut()
		} catch (_) {}
		router.push('/')
	})
</script>
