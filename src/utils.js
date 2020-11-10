import moment from 'moment';
import axios from 'axios';
export const BASE_URL = 'https://javaapiweb.herokuapp.com';
export const STATUS = ['Đang xử lý', 'Đang giao', 'Thành công', 'Đã huỷ'];
export function nonAccentVietnamese(str) {
	str = str.toLowerCase();
	//     We can also use this instead of from line 11 to line 17
	//     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
	//     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
	//     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
	//     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
	//     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
	//     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
	//     str = str.replace(/\u0111/g, "d");
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
	str = str.replace(/đ/g, 'd');
	// Some system encode vietnamese combining accent as individual utf-8 characters
	str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
	str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
	return str;
}
export const API = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Credentials': true,
		'Access-Control-Allow-Headers': 'content-type',
		'Access-Control-Allow-Methods': 'GET',
	},
});
export const getNumberWithDot = (x = 0) =>
	x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export function debounce(func, wait, immediate) {
	var timeout;
	return function () {
		var context = this,
			args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
}

export function isMobile() {
	if (window) {
		return window.matchMedia(`(max-width: 767px)`).matches;
	}
	return false;
}

export function isMdScreen() {
	if (window) {
		return window.matchMedia(`(max-width: 1199px)`).matches;
	}
	return false;
}

function currentYPosition() {
	if (!window) {
		return;
	}
	// Firefox, Chrome, Opera, Safari
	if (window.pageYOffset) return window.pageYOffset;
	// Internet Explorer 6 - standards mode
	if (document.documentElement && document.documentElement.scrollTop)
		return document.documentElement.scrollTop;
	// Internet Explorer 6, 7 and 8
	if (document.body.scrollTop) return document.body.scrollTop;
	return 0;
}

function elmYPosition(elm) {
	var y = elm.offsetTop;
	var node = elm;
	while (node.offsetParent && node.offsetParent !== document.body) {
		node = node.offsetParent;
		y += node.offsetTop;
	}
	return y;
}

export function scrollTo(scrollableElement, elmID) {
	var elm = document.getElementById(elmID);
	if (!elmID || !elm) {
		return;
	}
	var startY = currentYPosition();
	var stopY = elmYPosition(elm);
	var distance = stopY > startY ? stopY - startY : startY - stopY;
	if (distance < 100) {
		scrollTo(0, stopY);
		return;
	}
	var speed = Math.round(distance / 50);
	if (speed >= 20) speed = 20;
	var step = Math.round(distance / 25);
	var leapY = stopY > startY ? startY + step : startY - step;
	var timer = 0;
	if (stopY > startY) {
		for (var i = startY; i < stopY; i += step) {
			setTimeout(
				(function (leapY) {
					return () => {
						scrollableElement.scrollTo(0, leapY);
					};
				})(leapY),
				timer * speed
			);
			leapY += step;
			if (leapY > stopY) leapY = stopY;
			timer++;
		}
		return;
	}
	for (let i = startY; i > stopY; i -= step) {
		setTimeout(
			(function (leapY) {
				return () => {
					scrollableElement.scrollTo(0, leapY);
				};
			})(leapY),
			timer * speed
		);
		leapY -= step;
		if (leapY < stopY) leapY = stopY;
		timer++;
	}
	return false;
}

export function getTimeDifference(date) {
	let difference =
		moment(new Date(), 'DD/MM/YYYY HH:mm:ss').diff(
			moment(date, 'DD/MM/YYYY HH:mm:ss')
		) / 1000;

	if (difference < 60) return `${Math.floor(difference)} seconds`;
	else if (difference < 3600) return `${Math.floor(difference / 60)} minutes`;
	else if (difference < 86400) return `${Math.floor(difference / 3660)} hours`;
	else if (difference < 86400 * 30)
		return `${Math.floor(difference / 86400)} days`;
	else if (difference < 86400 * 30 * 12)
		return `${Math.floor(difference / 86400 / 30)} months`;
	else return `${(difference / 86400 / 30 / 12).toFixed(1)} years`;
}

export function generateRandomId() {
	let tempId = Math.random().toString();
	let uid = tempId.substr(2, tempId.length - 1);
	return uid;
}

export function getQueryParam(prop) {
	var params = {};
	var search = decodeURIComponent(
		window.location.href.slice(window.location.href.indexOf('?') + 1)
	);
	var definitions = search.split('&');
	definitions.forEach(function (val, key) {
		var parts = val.split('=', 2);
		params[parts[0]] = parts[1];
	});
	return prop && prop in params ? params[prop] : params;
}

export function classList(classes) {
	return Object.entries(classes)
		.filter((entry) => entry[1])
		.map((entry) => entry[0])
		.join(' ');
}
