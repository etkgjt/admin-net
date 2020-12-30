import { API } from 'utils';
import { REDUX } from '../type';

export const getOrderList = (token) =>
	new Promise((resolve, reject) => {
		API.get('/orders', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) =>
				resolve(
					res?.data.map((v) => ({
						...v,
						shipping_address: v.shippingAddress,
						payment_method:
							v.paymentMethod?.toLowerCase() == 'delivery'
								? 2
								: v.paymentMethod?.toLowerCase() == 'paypal'
								? 1
								: 0,
						customer: {
							...v.customer,
							username: v.customer.email,
							first_name: v.customer.firstname,
							last_name: v.customer.lastname,
							phone_number: v.customer.phone,
						},
						details: [
							...v.orderDetails.map((k) => ({
								product: { ...k.product },
								quantity: k.quantity,
								current_price: k.currentPrice,
							})),
						],
					}))
				)
			)
			.catch((err) => reject(err?.response?.data));
	});
export const updateOrder = (token, orderId, orderInfo) =>
	new Promise((resolve, reject) => {
		API.put(`/orders/${orderId}`, orderInfo, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		})
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err));
	});
export const updateOrdersRedux = (dispatch, orders) => {
	dispatch({
		type: REDUX.UPDATE_ORDER_LIST,
		payload: orders,
	});
};
export const updateOrderStatus = (token, status, orderId) =>
	new Promise((resolve, reject) => {
		API.put(`/orders/status/${orderId}`, status, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => resolve(res))
			.catch((err) => reject(err));
	});
