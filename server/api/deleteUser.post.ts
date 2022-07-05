import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'

export default eventHandler(async event => {
	const user = await serverSupabaseUser(event)
	if (!user?.id) throw createError('Unauthorized')

	const supabase = serverSupabaseServiceRole(event)

	// Delete all links from this user.
	const { error: deletedLinksError } = await supabase.from('links').delete().eq('user_id', user.id)
	if (deletedLinksError) throw createError('error deleting all links, therefore cannot delete user')

	// Then delete the user.
	const { error: deletedUserError } = await supabase.auth.api.deleteUser(user.id)
	if (deletedUserError) throw createError('error deleting user')

	return { success: true }
})
