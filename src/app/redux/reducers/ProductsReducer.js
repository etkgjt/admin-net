import { REDUX } from '../type';
const initialState = {
	products: [],
};
const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case REDUX.CLEAR_DATA: {
			return initialState;
		}
		case REDUX.UPDATE_PRODUCT_LIST: {
			return {
				...state,
				products: action.payload,
			};
		}
		case REDUX.UPDATE_PRODUCT_INFO: {
			return {
				...state,
				products: action.payload,
			};
		}
		default: {
			return { ...state };
		}
	}
};
export default productsReducer;
