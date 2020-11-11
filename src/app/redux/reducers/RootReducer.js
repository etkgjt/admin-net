import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import UserReducer from './UserReducer';
import LayoutReducer from './LayoutReducer';
import ScrumBoardReducer from './ScrumBoardReducer';
import NotificationReducer from './NotificationReducer';
import EcommerceReducer from './EcommerceReducer';
import productReducer from './ProductsReducer';
import customerReducer from './CustomerReducer';
import orderReducer from './OrderReducer';
import statisticReducer from './StatisticReducer';
import contactReducer from './ContactReducer';

const RootReducer = combineReducers({
	login: LoginReducer,
	user: UserReducer,
	layout: LayoutReducer,
	scrumboard: ScrumBoardReducer,
	notification: NotificationReducer,
	ecommerce: EcommerceReducer,
	productReducer,
	customerReducer,
	orderReducer,
	statisticReducer,
	contactReducer,
});

export default RootReducer;
