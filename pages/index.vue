<template>
	<div>
		<Head>
			<Title>supalink — 👀 Share, engange and boom — link gone!</Title>
			<Meta
				name="description"
				content="Share a shortlink for a limited amount of people, that destroys itsself after the maximum is reached. For free." />
			<Meta property="og:image" content="/images/og_image.jpg" />
		</Head>

		<section class="flex flex-col justify-center items-center text-center mt-8 tablet:mt-20 mx-auto">
			<h1 class="h1-large">👀 Share, engange<br />and boom <i>—</i> link gone!</h1>
			<p class="mt-6 text-xl text-gray-400">
				You want to share a shortlink for a limited amount of people,<br class="hidden tablet:block" />that destroys
				itsself after the maximum is reached?
			</p>
			<p class="mt-2 text-xl text-gray-400">Now you can. For free. ✌️</p>

			<div class="mt-8 max-w-full tablet:max-w-md w-full">
				<template v-if="!user">
					<form v-if="success === null" @submit.prevent="login" class="flex w-full flex-col gap-6 max-w-sm mx-auto">
						<input type="email" v-model="email" class="w-full" placeholder="What's your email?" required />
						<Button type="submit" class="w-full justify-center">
							{{ loading ? 'Hyping up... 🚀' : "Let's get started 💪" }}
						</Button>
					</form>

					<Alert v-if="success === true" alertType="success"> Cool! Check your inbox 📬 </Alert>
					<Alert v-if="success === false" alertType="error"> Something went wrong :/ </Alert>
				</template>

				<div v-else class="flex flex-col tablet:flex-row gap-4">
					<Button is="link" to="/manage" class="w-full justify-center"> Manage your shortlinks </Button>
					<Button buttonType="secondary" is="link" to="/logout" class="w-full justify-center"> Sign Out 👋 </Button>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
	const user = useSupabaseUser()
	const supabase = useSupabaseClient()
	const router = useRouter()

	const email = ref('')
	const loading = ref(false)
	const success = ref(null)

	const login = async () => {
		success.value = null
		loading.value = true

		const { error } = await supabase.auth.signIn(
			{ email: email.value },
			{ redirectTo: window.location.origin + '/login-callback' }
		)

		loading.value = false
		if (error) return (success.value = false)

		success.value = true
	}
</script>
