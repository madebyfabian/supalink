<template>
	<div
		class="rounded-xl p-4 border-2 font-semibold"
		:class="{
			'bg-teal-900/50 border-teal-900 text-teal-300': alertType === 'success',
			'bg-red-900/25 border-red-900/50 text-red-300': alertType === 'error',
		}">
		<slot />
	</div>
</template>

<script lang="ts" setup>
	defineProps({
		'alertType': {
			type: String,
			required: true,
			validator: value => ['success', 'error'].includes(value as string),
		},
	})
</script>
