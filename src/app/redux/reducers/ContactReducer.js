import { REDUX } from '../type';
import moment from 'moment';
const initialState = {
	messages: [
		{
			email: 'abc@gmail.com',
			message:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			phone: '0212312123',
			date: moment().format('YYYY/MM/DD HH:mm:ss'),
			is_reply: true,
		},
		{
			email: 'abc@gmail.com',
			message:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			phone: '0212312123',
			date: moment().format('YYYY/MM/DD HH:mm:ss'),
			is_reply: false,
		},
		{
			email: 'abc@gmail.com',
			message:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			phone: '0212312123',
			date: moment().format('YYYY/MM/DD HH:mm:ss'),
			is_reply: false,
		},
		{
			email: 'abc@gmail.com',
			message:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			phone: '0212312123',
			date: moment().format('YYYY/MM/DD HH:mm:ss'),
			is_reply: true,
		},
		{
			email: 'abc@gmail.com',
			message:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			phone: '0212312123',
			date: moment().format('YYYY/MM/DD HH:mm:ss'),
			is_reply: false,
		},
		{
			email: 'abc@gmail.com',
			message:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			phone: '0212312123',
			date: moment().format('YYYY/MM/DD HH:mm:ss'),
			is_reply: false,
		},
	],
};
const contactReducer = (state = initialState, action) => {
	switch (action.type) {
		case REDUX.UPDATE_CONTACT_MESSAGE: {
			return {
				...state,
				messages: action.payload,
			};
		}
		default: {
			return state;
		}
	}
};
export default contactReducer;
