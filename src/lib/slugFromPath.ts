export const slugFromPath = (path: string) => {
	// Extract just the filename from the full path
	const filename = path.split('/').pop() || '';

	// Parse out the date prefix if it exists (YYYY-MM-DD-)
	const withoutDate = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '');

	// Remove the file extension
	return withoutDate.replace(/\.(svelte\.md|md|svx)$/i, '');
};
