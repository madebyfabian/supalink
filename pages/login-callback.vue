<template>
	<div>...</div>
</template>

<script setup>
	const user = useSupabaseUser()
	const router = useRouter()

	watch(user, () => {
		if (user.value) router.push('/manage')
	})
</script>
