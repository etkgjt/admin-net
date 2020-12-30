import history from 'history.js';
import jwtAuthService from '../../services/jwtAuthService';
import { API } from '../../../utils';
import { REDUX } from '../type';

export const SET_USER_DATA = 'USER_SET_DATA';
export const REMOVE_USER_DATA = 'USER_REMOVE_DATA';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

export const userLogin = (userInfo) =>
	new Promise((resolve, reject) => {
		API.post('/login', userInfo, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err));
	});
export const getUserInfo = (token, userName) =>
	new Promise((resolve, reject) => {
		API.get(`/user?value=${userName}`, {
			headers: {
				Authorization: token,
			},
		})
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err));
	});

export function setUserData(user) {
	return (dispatch) => {
		dispatch({
			type: SET_USER_DATA,
			data: user,
		});
	};
}

export function logoutUser() {
	console.log('Log out ne');
	return (dispatch) => {
		history.push({
			pathname: '/session/signin',
		});

		dispatch({
			type: USER_LOGGED_OUT,
		});
	};
}
export const createNewVoucher = (voucher) => async (dispatch) => {
	try {
		const res = await API.post('/voucher', voucher);
		const { data } = await API.get('/voucher');
		dispatch(updateVoucherListActionCreator(data));
	} catch (err) {
		console.log('create voucher err', err);
		dispatch(updateVoucherListActionCreator([]));
	}
};

export const getAllVoucherSync = () => async (dispatch) => {
	try {
		const { data } = await API.get('/vouchers');
		console.log('voucher ne', data);
		dispatch(
			updateVoucherListActionCreator(
				data.map((v) => ({
					...v,
					start: v.startDate,
					end: v.endDate,
					voucher: v.code,
					discount_percent: v.discountPercent,
				}))
			)
		);
	} catch (err) {
		console.log('get all voucher list err', err);
		dispatch(updateVoucherListActionCreator([]));
	}
};
export const updateVoucherInfo = (id, info) => async (dispatch) => {
	try {
		const res = await API.put(`/voucher/${id}`, info);
		console.log('change info success', res.data);
		const { data } = await API.get('/voucher');
		dispatch(updateVoucherListActionCreator(data));
	} catch (err) {
		console.log('update voucehr info err', err);
		dispatch(updateVoucherListActionCreator([]));
	}
};
export const deleteVoucher = (id) => async (dispatch) => {
	try {
		await API.delete(`/voucher/${id}`);
		const { data } = await API.get('/voucher');
		dispatch(updateVoucherListActionCreator(data));
		console.log('list voucher sau khi delete', data);
	} catch (err) {
		console.log('Delete voucher error', err);
		dispatch(updateVoucherListActionCreator([]));
	}
};
const updateVoucherListActionCreator = (payload) => ({
	type: REDUX.UPDATE_VOUCHER_LIST,
	payload: payload,
});
