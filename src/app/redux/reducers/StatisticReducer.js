import { REDUX } from '../type';

const initialState = {
	sale: {
		week: {
			'1-2020': 9012,
			'2-2020': 2330,
			'3-2020': 9023,
			'4-2020': 2222,
			'5-2020': 6662,
			'6-2020': 5230,
			'7-2020': 1000,
			'8-2020': 4400,
			'9-2020': 3301,
			'10-2020': 9000,
			'11-2020': 3400,
			'12-2020': 2389,
		},

		month: {
			'1-2020': 10,
			'2-2020': 100,
			'3-2020': 123,
			'4-2020': 12,
			'5-2020': 122,
			'6-2020': 500,
			'7-2020': 1000,
			'8-2020': 2,
			'9-2020': 21,
			'10-2020': 2000,
			'11-2020': 200,
			'12-2020': 489,
		},
		year: {
			2010: 101,
			2011: 1200,
			2012: 13,
			2013: 121,
			2014: 1222,
			2015: 50,
			2016: 1000,
			2017: 2,
			2018: 21,
			2019: 230,
			2020: 100200,
			2021: 4449,
		},
	},
	customer: [],
	product: [
		{
			name: 'Iphone 7 plus',
			buying_times: 20,
			price: 100,
			rating: 4.9,
			image: '/assets/images/products/headphone-3.jpg',
		},
		{
			name: 'Iphone 9 plus',
			buying_times: 19,
			price: 99,
			rating: 4.2,
			image: '/assets/images/products/headphone-2.jpg',
		},
		{
			name: 'Iphone 8 plus',
			buying_times: 18,
			price: 98,
			rating: 4.3,
			image: '/assets/images/products/headphone-3.jpg',
		},
		{
			name: 'Iphone 10 plus',
			buying_times: 17,
			price: 97,
			rating: 4.4,
			image: '/assets/images/products/iphone-2.jpg',
		},
		{
			name: 'Iphone 11 plus',
			buying_times: 16,
			price: 96,
			rating: 4.1,
			image: '/assets/images/products/headphone-3.jpg',
		},
		{
			name: 'Iphone 23 plus',
			buying_times: 15,
			price: 95,
			rating: 4.5,
			image: '/assets/images/products/iphone-1.jpg',
		},
		{
			name: 'Iphone 1 plus',
			buying_times: 14,
			price: 94,
			rating: 4.8,
			image: '/assets/images/products/headphone-3.jpg',
		},
	],
	category: [
		{ name: 'Smart Phone', value: 235 },
		{ name: 'Laptop', value: 251 },
		{ name: 'Accessories', value: 25 },
		{ name: 'Tablet', value: 25 },
	],
};
const statisticReducer = (state = initialState, action) => {
	switch (action.type) {
		case REDUX.UPDATE_CUSTOMER_STATISTIC_DATA: {
			return {
				...state,
				customer: [...action.payload],
			};
		}
		case REDUX.UPDATE_CATEGORY_STATISTIC_DATA: {
			return {
				...state,
				category: action.payload,
			};
		}
		case REDUX.UPDATE_SALES_STATISTIC_DATA: {
			return {
				...state,
				sale: action.payload,
			};
		}
		case REDUX.UPDATE_PRODUCT_STATISTIC_DATA: {
			return {
				...state,
				product: action.payload,
			};
		}
		default: {
			return state;
		}
	}
};
export default statisticReducer;
