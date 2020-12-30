import { reject } from 'lodash';
import { API } from '../../../utils';
import { REDUX } from '../type';

export const getAllProducts = () =>
	new Promise((resolve, reject) => {
		API.get('/products')
			.then((res) =>
				resolve(
					res?.data.map((v) => ({
						...v,
						brand: v.brandId,
						buying_times: v.buyingTimes,
						date_arrive: v.dateArrive,
						description: {
							...v.descriptions?.[0],
							screen_size: v.descriptions[0]?.screenSize
								? v.descriptions[0]?.screenSize
								: 0,
						},
						category: v.categoryId,
					}))
				)
			)
			.catch((err) => reject(err));
	});
export const addNewProduct = (product, token) =>
	new Promise((resolve, reject) => {
		API.post('/products', product, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				// if (res?.data?.status_code !== 200) reject(res.data);
				console.log('add product success', res?.data);
				resolve(res?.data);
			})
			.catch((err) => reject(err?.response?.data));
	});
export const deleteProduct = (token, product_id) =>
	new Promise((resolve, reject) => {
		API.delete(`/product/delete/${product_id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err?.response?.data));
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
		API.put(`/products/${product_id}`, product_info, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err?.response?.data));
	});

export const updateProductsRedux = (dispatch, payload) => {
	dispatch({ type: REDUX.UPDATE_PRODUCT_LIST, payload: payload });
};
