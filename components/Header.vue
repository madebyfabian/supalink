<template>
	<header class="bg-gray-800">
		<div
			class="container flex flex-col tablet:flex-row justify-around tablet:justify-between items-center h-28 tablet:h-24">
			<NuxtLink to="/" class="font-extrabold tracking-tighter text-2xl">
				supa
				<i class="text-primary">_linked</i>
			</NuxtLink>

			<nav>
				<ul class="flex items-center justify-center gap-8">
					<li v-if="user" class="flex gap-4">
						<p>{{ user.email }}</p>
						<button @click="supabase.auth.signOut()" class="font-semibold">Sign Out 👋</button>
					</li>
					<li>
						<NuxtLink to="/manage" class="flex bg-primary text-gray-900 py-3 px-4 rounded-xl font-semibold"
							>Create new</NuxtLink
						>
					</li>
				</ul>
			</nav>
		</div>
	</header>
</template>

<script setup>
	const user = useSupabaseUser()
	const supabase = useSupabaseClient()
</script>
