<template>
	<div>...</div>
</template>

<script setup>
	const user = useSupabaseUser()
	const router = useRouter()

	watchEffect(() => {
		if (!user?.value) return

		setTimeout(() => {
			return router.push('/manage')
		}, 500)
	})
</script>
