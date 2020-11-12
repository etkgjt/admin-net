import { REDUX } from '../type';

const initialState = {
	sale: {
		
	},
	customer: [],
	product: [
		// {
		// 	name: 'Iphone 7 plus',
		// 	buying_times: 20,
		// 	price: 100,
		// 	rating: 4.9,
		// 	image: '/assets/images/products/headphone-3.jpg',
		// },
		// {
		// 	name: 'Iphone 9 plus',
		// 	buying_times: 19,
		// 	price: 99,
		// 	rating: 4.2,
		// 	image: '/assets/images/products/headphone-2.jpg',
		// },
		// {
		// 	name: 'Iphone 8 plus',
		// 	buying_times: 18,
		// 	price: 98,
		// 	rating: 4.3,
		// 	image: '/assets/images/products/headphone-3.jpg',
		// },
		// {
		// 	name: 'Iphone 10 plus',
		// 	buying_times: 17,
		// 	price: 97,
		// 	rating: 4.4,
		// 	image: '/assets/images/products/iphone-2.jpg',
		// },
		// {
		// 	name: 'Iphone 11 plus',
		// 	buying_times: 16,
		// 	price: 96,
		// 	rating: 4.1,
		// 	image: '/assets/images/products/headphone-3.jpg',
		// },
		// {
		// 	name: 'Iphone 23 plus',
		// 	buying_times: 15,
		// 	price: 95,
		// 	rating: 4.5,
		// 	image: '/assets/images/products/iphone-1.jpg',
		// },
		// {
		// 	name: 'Iphone 1 plus',
		// 	buying_times: 14,
		// 	price: 94,
		// 	rating: 4.8,
		// 	image: '/assets/images/products/headphone-3.jpg',
		// },
	],
	category: {},
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
