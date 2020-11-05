import { reject } from 'lodash';
import { API } from '../../../utils';
import { REDUX } from '../type';

export const getAllProducts = () =>
	new Promise((resolve, reject) => {
		API.get('/product')
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err));
	});
export const addNewProduct = (product, token) =>
	new Promise((resolve, reject) => {
		API.post('/product/add', product, {
			headers: {
				Authorization: token,
			},
		})
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err));
	});
export const deleteProduct = (token, product_id) =>
	new Promise((resolve, reject) => {
		API.delete(`/product/delete/${product_id}`, {
			headers: {
				Authorization: token,
			},
		})
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err));
	});
export const updateProduct = (token, product_id, product_info) =>
	new Promise((resolve, reject) => {
		console.log(
			'product id',
			product_id,
			'product_info',
			product_info,
			'token',
			token
		);
		console.log(`/product/${product_id}`);
		API.put(`/product/${product_id}`, product_info, {
			headers: {
				Authorization: token,
			},
		})
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err));
	});

export const updateProductsRedux = (dispatch, payload) => {
	dispatch({ type: REDUX.UPDATE_PRODUCT_LIST, payload: payload });
};
