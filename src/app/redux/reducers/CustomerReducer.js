import { REDUX } from '../type';
const initialState = {
	customers: [],
};
const customerReducer = (state = initialState, action) => {
	switch (action.type) {
		case REDUX.CLEAR_DATA: {
			return initialState;
		}
		case REDUX.UPDATE_CUSTOMER_LIST: {
			return {
				...state,
				customers: action.payload,
			};
		}
		default: {
			return { ...state };
		}
	}
};
export default customerReducer;
