import jwtAuthService from '../../services/jwtAuthService';
import FirebaseAuthService from '../../services/firebase/firebaseAuthService';
import { setUserData } from './UserActions';
import history from 'history.js';
import { API } from 'utils';
import MySpinner from 'matx/components/MySpinner';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_LOADING = 'LOGIN_LOADING';
export const RESET_PASSWORD = 'RESET_PASSWORD';

function parseJwt(token) {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jsonPayload = decodeURIComponent(
		atob(base64)
			.split('')
			.map(function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join('')
	);

	return JSON.parse(jsonPayload);
}

export function loginWithEmailAndPassword({ email, password }) {
	return async (dispatch) => {
		try {
			MySpinner.show();
			dispatch({
				type: LOGIN_LOADING,
			});
			const res = await userLogin(email, password);
			console.log(res);
			const userInfo = await getUserInfo(res?.access_token);
			console.log('user info ne', userInfo);
			if (userInfo && userInfo?.role && userInfo?.role?.name === 'ADMIN') {
				dispatch(
					setUserData({
						...userInfo,
						role: 'ADMIN',
						token: res?.access_token,
					})
				);
				console.log('Login Success');
				dispatch({ type: LOGIN_SUCCESS });
				history.push({ pathname: '/dashboard/analytics' });
			} else {
				return dispatch({
					type: LOGIN_ERROR,
					payload: `You don't have permission`,
				});
			}
			MySpinner.hide(() => {});
		} catch (err) {
			MySpinner.hide(() => {}, {
				label: `Login Failed \n ${err.message}`,
				value: 1,
			});
			return dispatch({
				type: LOGIN_ERROR,
				payload: err,
			});
		}
	};
}
const getUserInfo = (token) =>
	new Promise((resolve, reject) => {
		const { sub } = parseJwt(token);
		API.get(`/user?value=${sub}`, {
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
		})
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err));
	});
const userLogin = (email, password) =>
	new Promise((resolve, reject) => {
		const data = JSON.stringify({ username: email, password: password });
		API.post('/login', data, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err));
	});

export function resetPassword({ email }) {
	return (dispatch) => {
		dispatch({
			payload: email,
			type: RESET_PASSWORD,
		});
	};
}

export function firebaseLoginEmailPassword({ email, password }) {
	return (dispatch) => {
		FirebaseAuthService.signInWithEmailAndPassword(email, password)
			.then((user) => {
				if (user) {
					dispatch(
						setUserData({
							userId: '1',
							role: 'ADMIN',
							displayName: 'Watson Joyce',
							email: 'watsonjoyce@gmail.com',
							photoURL: '/assets/images/face-7.jpg',
							age: 25,
							token:
								'faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh',
							...user,
						})
					);

					history.push({
						pathname: '/',
					});

					return dispatch({
						type: LOGIN_SUCCESS,
					});
				} else {
					return dispatch({
						type: LOGIN_ERROR,
						payload: 'Login Failed',
					});
				}
			})
			.catch((error) => {
				return dispatch({
					type: LOGIN_ERROR,
					payload: error,
				});
			});
	};
}
