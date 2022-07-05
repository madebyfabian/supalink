import { serverSupabaseServiceRole } from '#supabase/server'

export default eventHandler(async event => {
	const body = await useBody(event)
	if (!body.shortcode?.length) throw createError('Missing shortcode.')

	const supabase = serverSupabaseServiceRole(event)
	const linkShortcode = body.shortcode

	// Get current and max amount amount
	const { error: getCountError, data: entry } = await supabase
		.from('links')
		.select('id, url, shortcode, clicked_amount, max_clicked_amount')
		.eq('shortcode', linkShortcode)
		.single()
	if (getCountError || typeof entry?.clicked_amount !== 'number') throw createError('Error getting link.')

	if (entry.clicked_amount >= entry.max_clicked_amount)
		throw createError('This link has reached the maximum amount of clicks and is now invalid.')

	if (!body.preview) {
		const { error: updatedError } = await supabase
			.from('links')
			.update({ clicked_amount: entry.clicked_amount + 1 })
			.eq('shortcode', linkShortcode)
		if (updatedError) throw createError('Error updating count.')
	}

	return { success: true, data: entry, preview: body.preview }
})
