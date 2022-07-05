<template>
	<div>
		<Head>
			<Title>Create New Link — supalinked</Title>
		</Head>

		<h1 class="mb-8">Create New Link</h1>
		<form @submit.prevent="handleSubmit">
			<div class="grid gap-8 grid-cols-1 tablet:grid-cols-2">
				<label class="flex flex-col gap-2 col-span-1">
					<span class="text-gray-400">Number of maximum clicks</span>
					<input type="number" name="maxClicks" placeholder="Max Clicks" v-model="maxClicks" required />
				</label>
				<label class="flex flex-col gap-2 col-span-1">
					<span class="text-gray-400">The URL you want the user to visit</span>
					<input type="url" name="url" placeholder="e.g. https://mycool.app" v-model="url" required />
				</label>
			</div>
			<Button type="submit" class="mt-8 ml-auto w-full tablet:w-auto justify-center">Create your new Link</Button>
		</form>
	</div>
</template>

<script lang="ts" setup>
	definePageMeta({
		middleware: 'auth',
	})

	const router = useRouter()
	const supabase = useSupabaseClient()
	const user = useSupabaseUser()

	const makeShortcode = (length: number) => {
		let result = ''
		let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		let charactersLength = characters.length
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength))
		}
		return result
	}

	const url = ref('https://example.com')
	const maxClicks = ref(100)

	const handleSubmit = async () => {
		const { data: success, error } = await supabase.from('links').insert([
			{
				shortcode: makeShortcode(8),
				url: url.value,
				max_clicked_amount: maxClicks.value,
				user_id: user.value.id,
			},
		])

		if (success && !error) {
			alert('Created link successfully!')
			router.push({ name: 'manage' })
		} else {
			alert('Error creating link.')
		}
	}
</script>
