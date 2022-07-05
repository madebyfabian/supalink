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
		const { error } = await supabase.auth?.signOut()
		if (error) return alert('Error while trying to sign out. Please try again.')
		await nextTick()
		return router.push('/')
	})
</script>
