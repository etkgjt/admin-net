import { API } from 'utils';
import { REDUX } from '../type';

export const getAllStatistic = (token) =>
	new Promise((resolve, reject) => {
		API.get('/statistic', {
			headers: {
				Authorization: token,
			},
		})
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err));
	});
export const updateStatisticDataToRedux = (
	dispatch,
	sale,
	product,
	customer,
	category
) => {
	dispatch({
		type: REDUX.UPDATE_CATEGORY_STATISTIC_DATA,
		payload: category,
	});
	dispatch({
		type: REDUX.UPDATE_CUSTOMER_STATISTIC_DATA,
		payload: customer,
	});
	dispatch({
		type: REDUX.UPDATE_SALES_STATISTIC_DATA,
		payload: sale,
	});
	dispatch({
		type: REDUX.UPDATE_PRODUCT_STATISTIC_DATA,
		payload: product,
	});
};
