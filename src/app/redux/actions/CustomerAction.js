import { CodeSharp } from '@material-ui/icons';
import { API } from '../../../utils';
import { REDUX } from '../type';

export const addNewCustomer = (userInfo) =>
	new Promise((resolve, reject) => {
		API.post('/user/add', userInfo, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err));
	});
export const getAllCustomer = (token) =>
	new Promise((resolve, reject) => {
		API.get('/user/all', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		})
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err));
	});
// export const deleteCustomer = (token,customer_id) => new Promise((resolve,reject)=>{
//     API.delete(`/api/user`)
// })
export const updateCustomer = (token, customer_id, customer_info) =>
	new Promise((resolve, reject) => {
		API.put(`/user/${customer_id}`, customer_info, {
			headers: {
				Authorization: token,
			},
		})
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err));
	});

export const updateAllCustonerToRedux = (dispatch, payload) => {
	console.log('update customerlist to redux ne', payload);
	dispatch({ type: REDUX.UPDATE_CUSTOMER_LIST, payload: payload });
};
