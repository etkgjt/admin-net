export const navigations = [
	{
		name: 'Dashboard',
		path: '/dashboard/analytics',
		icon: 'dashboard',
	},
	{
		name: 'Customer',
		icon: 'people_alt',
		children: [
			{
				name: 'New Customer',
				path: '/customer/new-customer',
				iconText: 'B',
			},
			{
				name: 'Customer List',
				path: '/customer/customer-list',
				iconText: 'E',
			},
			{
				name: 'View Customer',
				path: '/customer/view-customer',
				iconText: 'E',
			},
		],
	},
	{
		name: 'Products',
		icon: 'shopping_cart',
		children: [
			{
				name: 'New Product',
				path: '/product/new-product',
				iconText: 'B',
			},
			{
				name: 'Product List',
				path: '/product/product-list',
				iconText: 'E',
			},
			{
				name: 'View Product',
				path: '/product/view-product',
				iconText: 'E',
			},
		],
	},
	{
		name: 'Orders',
		icon: 'folder',
		children: [
			{
				name: 'Order List',
				path: '/order/order-list',
				iconText: 'E',
			},
			{
				name: 'View Order',
				path: '/order/view-order',
				iconText: 'E',
			},
		],
	},
	{
		name: 'Sign Out',
		icon: 'meeting_room',
		path: '/others/drag-and-drop',
	},
	{
		name: 'Sessions',
		icon: 'trending_up',
		children: [
			{
				name: 'Sign in',
				iconText: 'SI',
				path: '/session/signin',
			},
			{
				name: 'Sign up',
				iconText: 'SU',
				path: '/session/signup',
			},
			{
				name: 'Forgot password',
				iconText: 'FP',
				path: '/session/forgot-password',
			},
			{
				name: 'Error',
				iconText: '404',
				path: '/session/404',
			},
		],
	},
];
