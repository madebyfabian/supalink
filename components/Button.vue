<template>
	<NuxtLink v-if="props.is === 'link'" :class="classnames">
		<slot />
	</NuxtLink>
	<button v-else :class="classnames">
		<slot />
	</button>
</template>

<script lang="ts" setup>
	const props = defineProps({
		'is': {
			type: String,
			default: 'button',
			validator: value => ['button', 'link'].includes(value as string),
		},
		'buttonType': {
			type: String,
			default: 'primary',
			validator: value => ['primary', 'secondary', 'tertiary'].includes(value as string),
		},
	})

	const classnames = computed(() => {
		let classnames = 'flex font-semibold'

		if (props.buttonType === 'primary') {
			classnames += ' bg-primary text-gray-900 px-5 py-3 rounded-xl'
		}
		if (props.buttonType === 'secondary') {
			classnames += ' bg-teal-900/50 text-primary px-5 py-3 rounded-xl'
		}
		if (props.buttonType === 'tertiary') {
			classnames += ' text-primary px-0 py-0'
		}

		return classnames
	})
</script>
