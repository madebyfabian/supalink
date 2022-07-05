<template>
	<div>
		<Head>
			<Title>Your Links — supalinked</Title>
		</Head>

		<div v-if="links">
			<div class="mb-8 flex justify-between">
				<h1>Your Links</h1>
				<Button is="link" to="/manage/create" buttonType="secondary"> Add new </Button>
			</div>

			<section class="rounded-2xl border-2 border-gray-800">
				<ul class="divide-y-2 divide-solid divide-gray-800">
					<li v-for="link of links" class="px-6 py-4 flex flex-col tablet:flex-row gap-4 tablet:gap-6">
						<LabelValue class="shrink-0 w-20 tabular-nums tracking-wide font-semibold">
							<template #label>#ID</template>
							{{ link.shortcode }}
						</LabelValue>

						<LabelValue>
							<template #label>Statistics (Clicks/Max)</template>
							<span class="font-semibold">{{ link.clicked_amount }}</span
							>&nbsp;
							<span>(of {{ link.max_clicked_amount }})</span>
						</LabelValue>

						<LabelValue>
							<template #label>Link the user will see:</template>
							<span class="font-semibold">
								{{ link.url }}
							</span>
						</LabelValue>

						<div class="flex flex-col justify-start tablet:justify-end grow tablet:flex-row gap-2 tablet:gap-8">
							<div class="flex gap-6 items-start tablet:items-center">
								<template v-if="link.clicked_amount < link.max_clicked_amount">
									<NuxtLink
										:to="`/l/${link.shortcode}?preview=true`"
										target="_blank"
										class="inline-flex text-primary font-semibold">
										Preview URL ↗
									</NuxtLink>
									<button class="inline-flex text-primary font-semibold" @click="() => copyLinkToClipboard(link.id)">
										Copy URL
									</button>
								</template>
								<div v-else class="text-gray-400">Link exceeded.</div>
								<button class="inline-flex text-red-300 font-semibold" @click="() => deleteLink(link)">Delete</button>
							</div>
						</div>
					</li>
				</ul>
			</section>
		</div>

		<div v-else-if="!links && !error">Loading...</div>

		<div v-else>Something went wrong...</div>
	</div>
</template>

<script lang="ts" setup>
	definePageMeta({
		middleware: 'auth',
	})

	const supabase = useSupabaseClient()
	const user = useSupabaseUser()

	const links = ref<null | any[]>(null)
	const error = ref(null)

	const fetchLinks = async () => {
		const { data, error: resErr } = await supabase.from('links').select('*').eq('user_id', user.value.id)
		links.value = data
		error.value = resErr
	}

	onMounted(() => {
		fetchLinks()
	})

	const copyLinkToClipboard = async id => {
		const link = links.value?.find(l => l.id === id)
		const url = `${window.location.origin}/l/${link.shortcode}`

		try {
			if (!url) throw new Error('No link found')

			await navigator.clipboard.writeText(url)
			alert('Copied to clipboard!')
		} catch (error) {
			prompt('Could not copy to clipboard, please copy it from here:', url)
		}
	}

	const deleteLink = async (link: any) => {
		if (!confirm('Do you want to delete this link?')) return

		try {
			const { error: deleteLinkErr } = await supabase.from('links').delete().eq('id', link.id)
			if (deleteLinkErr) throw new Error('Error deleting from `links`')

			fetchLinks()

			alert('Successfully deleted link.')
		} catch (error) {
			console.error(error)
			alert('Something went wrong...')
		}
	}
</script>
