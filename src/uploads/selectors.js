import { createSelector } from 'reselect'

const getUploads = state => state.uploads;

export const getUploadOrderByDate = createSelector(
	[getUploads],
	(uploads) => {
		let keys = Object.keys(uploads);

		keys.sort((a, b) => {
			return (
				a.timestamp == b.timestamp ? 0 :
					a.timestamp < b.timestamp ? -1 : 1
			);
		});

		keys.reverse();

		return keys;
	}
)