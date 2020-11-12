import { API } from 'utils';
import { REDUX } from '../type';
export const getAllContactMessage = (token) =>
	new Promise((resolve, reject) => {
		API.get('/contact', {
			headers: {
				Authorization: token,
			},
		})
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err));
	});
export const reply = (token, messageId) =>
	new Promise((resolve, reject) => {
		API.put(`/contact/${messageId}`)
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err));
	});
export const updateContactMessageToRedux = (dispatch, messages) => {
	dispatch({ type: REDUX.UPDATE_CONTACT_MESSAGE, payload: messages });
};
