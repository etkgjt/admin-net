// const isTokenExpired = true;
// let token = 'Current token';
// let count = 0;
// const refreshToken = (url) => {
// 	console.log('Refresh token url: ', url);
// 	return new Promise((resolve) => {
// 		setTimeout(() => {
// 			console.log('\n');
// 			resolve('New token' + ++count);
// 		}, 3000);
// 	});
// };

// let refreshTokenRequest = null;
// const requestApi = async (url) => {
// 	if (isTokenExpired) {
// 		console.log('requestApi: Ooops ... token expired: ', url, token);

// 		refreshTokenRequest = refreshTokenRequest
// 			? refreshTokenRequest
// 			: refreshToken(url);

// 		const newToken = await refreshTokenRequest;

// 		refreshTokenRequest = null;

// 		token = newToken;
// 		console.log('requestApi: Fetch data with new token: ', url, token);
// 		return;
// 	}

// 	console.log('Fetch data: ', url, token)
// };

// const requestAPI2 = async (url) => {
// 	if (isTokenExpired) {
// 		console.log('requestApi: Ooops ... token expired: ', url, token);
// 		const newToken = await refreshToken(url);

// 		token = newToken;

// 		console.log('requestApi: Fetch data with new token: ', url, token);
// 		return;
// 	}

// 	console.log('Fetch data: ', url, token);
// };

// const main = () => {
// 	// requestApi('/me');

// 	// requestApi('/shops');

// 	// requestApi('/products');

// 	requestAPI2('/me');

// 	requestAPI2('/shops');

// 	requestAPI2('/products');
// };
// main();

// async function count() {
// 	let c = 0;
// 	return () => {
// 		console.log(++c);
// 	};
// }
// // let a = count();
// // a();
// // a();
// // a();
// // count()();
// // count()();
// // count()();

