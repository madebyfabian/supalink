<template>
	<div>
		<Head>
			<Title>Your Account — supalink</Title>
		</Head>
		<div class="mb-8">
			<h1>Your Account</h1>
			<p class="mt-3 text-gray-400">{{ user.email }}</p>
			<Button buttonType="secondary" is="link" to="/logout" class="justify-center tablet:max-w-xs w-full mt-4"
				>Sign out 👋</Button
			>

			<h2 class="mt-12 mb-4">Danger Zone</h2>
			<Button buttonType="secondary" @click="handleDeleteAccount" class="justify-center tablet:max-w-xs w-full"
				>Delete your account</Button
			>
		</div>
	</div>
</template>

<script lang="ts" setup>
	definePageMeta({
		middleware: 'auth',
	})

	const router = useRouter()
	const user = useSupabaseUser()

	const handleDeleteAccount = async () => {
		if (!confirm('Are you sure you want to delete your account? This also deletes are your links immediately.')) return

		try {
			const res = await $fetch('/api/deleteUser', { method: 'post' })
			if (!res?.success) {
				throw new Error('Error while deleting account')
			}

			router.push('/logout')
			alert('Account successfully deleted.')
		} catch (error) {
			alert('Issue with deleting your account. Please contact me.')
			console.error(error)
		}
	}
</script>
