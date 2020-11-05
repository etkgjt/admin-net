import { REDUX } from '../type';
const initialState = {
	orders: [],
};
const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case REDUX.UPDATE_ORDER_LIST: {
			return {
				...state,
				orders: [...action.payload],
			};
		}
		case REDUX.UPDATE_ORDER_INFO: {
			return {
				...state,
				orders: [...action.payload],
			};
        }
        default:{
            return state,
        }
	}
};
export default orderReducer;