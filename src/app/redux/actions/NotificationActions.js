import axios from 'axios';
import shortId from 'shortid';
import moment from 'moment';
import { API } from 'utils';
export const GET_NOTIFICATION = 'GET_NOTIFICATION';
export const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION';
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';
export const DELETE_ALL_NOTIFICATION = 'DELETE_ALL_NOTIFICATION';

export const generateNotiObject = (
	type = 0,
	id = 'k',
	date = moment(),
	email
) => {
	switch (type) {
		case 1: {
			return {
				id,
				heading: 'Customer',
				icon: {
					name: 'person_add',
					color: 'primary',
				},
				timestamp: date ? moment(date).valueOf() : moment.valueOf(),
				title: `${email ? email : ''} has become a member`,
				subtitle: '',
				path: '/customer/customer-list',
			};
		}
		case 2: {
			return {
				id,
				heading: 'Order',
				icon: {
					name: 'add_shopping_cart_icon',
					color: 'primary',
				},
				timestamp: date ? moment(date).valueOf() : moment.valueOf(),
				title: `New order from ${email ? email : ''}`,
				subtitle: 'Check it out!',
				path: '/order/order-list',
			};
		}
		case 3: {
			return {
				id,
				heading: 'Message',
				icon: {
					name: 'chat',
					color: 'primary',
				},
				timestamp: date ? moment(date).valueOf() : moment.valueOf(),
				title: `${email ? email : ''}`,
				subtitle: 'Check it out!',
				path: '/contact/message-list',
			};
		}
		default: {
			return;
		}
	}
};

export const getNotification = () => async (dispatch) => {
	try {
		const { data } = await API.get('/noti');
		let temp = [...data].sort(
			(a, b) => moment(b.date).valueOf() - moment(a.date).valueOf()
		);
		dispatch({
			type: GET_NOTIFICATION,
			payload: [...temp],
		});
	} catch (err) {
		console.log('get noti err', err);
	}
};

export const deleteNotification = (id, arr = []) => async (dispatch) => {
	try {
		await API.delete(`/noti/clear?id=${id}`);
		dispatch({
			type: DELETE_NOTIFICATION,
			payload: arr.filter((v) => v?.id !== id),
		});
	} catch (err) {
		dispatch({
			type: DELETE_NOTIFICATION,
			payload: [...arr],
		});
	}
};

export const deleteAllNotification = (arr) => async (dispatch) => {
	try {
		const res = await API.delete('/noti/clear');
		console.log('delete all noti success', res);
		dispatch({
			type: DELETE_ALL_NOTIFICATION,
		});
	} catch (err) {
		console.log('delete all noti err', err);
		dispatch({
			type: DELETE_NOTIFICATION,
			payload: arr,
		});
	}
};

export const createNotification = (notification) => (dispatch) => {
	axios.post('/api/notification/add', { notification }).then((res) => {
		dispatch({
			type: CREATE_NOTIFICATION,
			payload: res.data,
		});
	});
};
