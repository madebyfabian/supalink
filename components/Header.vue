<template>
	<header class="container mt-2 tablet:mt-6">
		<div
			class="bg-gray-800 px-4 py-4 tablet:py-0 tablet:px-6 -mx-4 tablet:-mx-6 rounded-3xl flex flex-wrap justify-between items-center h-auto gap-4 tablet:h-24">
			<NuxtLink to="/" class="font-extrabold tracking-tighter text-2xl">
				supa
				<i class="text-primary">_linked</i>
			</NuxtLink>

			<nav class="min-w-0">
				<ul class="flex items-center justify-center gap-8 min-w-0">
					<li v-if="user" class="flex flex-wrap gap-5 gap-y-0 min-w-0">
						<Button
							is="link"
							to="/manage/account"
							buttonType="tertiary"
							class="text-ellipsis overflow-hidden whitespace-nowrap block">
							{{ user.email }}
						</Button>
					</li>
					<li>
						<Button is="link" to="/manage">
							{{ user ? 'Manage' : 'Create your own link' }}
						</Button>
					</li>
				</ul>
			</nav>
		</div>
	</header>
</template>

<script setup>
	const user = useSupabaseUser()
</script>
