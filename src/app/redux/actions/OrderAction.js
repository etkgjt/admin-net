import { API } from 'utils';
import { REDUX } from '../type';

export const getOrderList = (token) =>
	new Promise((resolve, reject) => {
		API.get('/order', {
			headers: {
				Authorization: token,
			},
		})
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err?.response?.data));
	});
export const updateOrder = (token, orderId, orderInfo) =>
	new Promise((resolve, reject) => {
		API.put(`/order/${orderId}`, orderInfo, {
			headers: {
				Authorization: token,
			},
		})
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err?.response?.data));
	});
export const updateOrdersRedux = (dispatch, orders) => {
	dispatch({
		type: REDUX.UPDATE_ORDER_LIST,
		payload: orders,
	});
};
export const updateOrderStatus = (token, status, orderId) =>
	new Promise((resolve, reject) => {
		API.put(`/order/status/${orderId}`, status, {
			headers: {
				Authorization: token,
			},
		})
			.then((res) => resolve(res))
			.catch((err) => reject(err?.response?.data));
	});
