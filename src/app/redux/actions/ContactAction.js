import { API } from 'utils';
import { REDUX } from '../type';
export const getAllContactMessage = (token) =>
	new Promise((resolve, reject) => {
		API.get('/contacts', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) =>
				resolve(res?.data.map((v) => ({ ...v, reply: v.isReply })))
			)
			.catch((err) => reject(err));
	});
export const reply = (token, messageId) =>
	new Promise((resolve, reject) => {
		API.put(
			`/contacts/${messageId}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err));
	});
export const updateContactMessageToRedux = (dispatch, messages) => {
	dispatch({ type: REDUX.UPDATE_CONTACT_MESSAGE, payload: messages });
};
