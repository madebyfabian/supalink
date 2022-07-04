<template>
	<div>
		<h1>Sign in!</h1>
		<form @submit.prevent="login">
			<input type="email" v-model="email" />
			<button type="submit">leggo</button>
		</form>
		<div v-if="success">Check your inbox!</div>
	</div>
</template>

<script setup>
	const user = useSupabaseUser()
	const supabase = useSupabaseClient()
	const router = useRouter()

	const email = ref('hello@madebyfabian.com')
	const success = ref(false)

	const login = async () => {
		const { error } = await supabase.auth.signIn({ email: email.value }, { redirectTo: 'http://localhost:3000/manage' })
		if (error) return alert('Something went wrong !')

		success.value = true
	}
</script>
