import { createSelector } from 'reselect'

const getUploads = state => state.uploads;

export const getUploadOrderByDate = createSelector(
	[getUploads],
	(uploads) => {
		let keys = Object.keys(uploads);

		keys.sort((a, b) => {
			return uploads[a].timestamp > uploads[b].timestamp ? -1 : 1;
		});

		return keys;
	}
)