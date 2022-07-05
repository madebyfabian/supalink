<template>
	<div>...</div>
</template>

<script setup>
	const user = useSupabaseUser()
	const router = useRouter()

	watchEffect(user, () => {
		if (user.value) {
			setTimeout(() => {
				router.push('/manage')
			}, 500)
		}
	})
</script>
