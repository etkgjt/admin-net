import { ArrowBackIosOutlined } from '@material-ui/icons';
import { API } from 'utils';
import { REDUX } from '../type';

const getSaleStatistics = (token) =>
	new Promise((resolve, reject) => {
		API.get('/YearStatisticals', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => resolve(res.data))
			.catch((err) => reject(err));
	});
const getCircle = (token) =>
	new Promise((resolve, reject) => {
		API.get('/circles', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => resolve(res.data))
			.catch((err) => reject(err));
	});

const getTopProducts = (token) =>
	new Promise((resolve, reject) => {
		API.get('/topproducts', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => resolve(res.data))
			.catch((err) => reject(err));
	});

const getTopCustomer = (token) =>
	new Promise((resolve, reject) => {
		API.get('/topcustomers', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => resolve(res.data))
			.catch((err) => reject(err));
	});

const convertSaleData = (arr = []) => {
	let newArr = [];
	let week = {};
	let month = {};
	let year = {};
	for (let i = 0; i < arr.length; i++) {
		year[arr[i].year] = arr[i].totalYear;
		for (let j = 0; j < arr[i].monthStatisticals?.length; j++) {
			month[`${arr[i].monthStatisticals[j].month}-${arr[i].year}`] =
				arr[i].monthStatisticals[j].totalMonth;
		}
		for (let j = 0; j < arr[i].weekStatisticals?.length; j++) {
			week[`${arr[i].weekStatisticals[j].week}-${arr[i].year}`] =
				arr[i].weekStatisticals[j].totalWeek;
		}
	}
	return {
		week,
		month,
		year,
	};
};
const convertCircleData = (arr = []) => {
	return arr.reduce((x, y) => {
		if (y.categoryId !== 1)
			return { ...x, [`${y.category.name}`.toLowerCase()]: y.soldQuantity };
		return { ...x, smartphone: y.soldQuantity };
	}, {});
};
const convertTopProductData = (arr) => {
	console.log('top proc ne', arr);
	return arr.map((v) => ({
		name: v.product.name,
		buying_time: v.product.buyingTimes,
		rate: v.product.rating,
		image: v.product.images[0].url,
		price: v.product.price,
	}));
};
const convertCustomerData = (arr) =>
	arr.map((v) => ({
		name: v.customer.userName,
		last_buy: v.lastBuy,
		buying_time: v.totalOrders,
	}));

export const getAllStatistic = async (token) => {
	try {
		const res1 = await getSaleStatistics(token);
		const res2 = await getCircle(token);
		const res3 = await getTopProducts(token);
		const res4 = await getTopCustomer(token);

		console.log('Res3 ne', res3);
		const sale = convertSaleData(res1);
		const circle = convertCircleData(res2);
		const top = convertTopProductData(res3);
		const cus = convertCustomerData(res4);
		console.log('sale ne', sale, circle, top);
		return new Promise((resolve) =>
			resolve({
				sales: sale,
				customers: cus,
				circle: circle,
				product: top,
			})
		);
	} catch (err) {
		return new Promise((resolve, reject) => reject(err));
	}
};
// new Promise((resolve, reject) => {
// 	API.get('/statistic', {
// 		headers: {
// 			Authorization: token,
// 		},
// 	})
// 		.then((res) => resolve(res?.data))
// 		.catch((err) => reject(err));
// });

export const updateStatisticDataToRedux = (
	dispatch,
	sale = {},
	product,
	customer,
	category
) => {
	console.log('dispatch init statistics ne');
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
