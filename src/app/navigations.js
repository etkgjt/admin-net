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
				iconText: 'C',
			},
			{
				name: 'Customer List',
				path: '/customer/customer-list',
				iconText: 'CL',
			},
			{
				name: 'View Customer',
				path: '/customer/view-customer',
				iconText: 'EC',
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
				iconText: 'CP',
			},
			{
				name: 'Product List',
				path: '/product/product-list',
				iconText: 'CL',
			},
			{
				name: 'View Product',
				path: '/product/view-product',
				iconText: 'EP',
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
				iconText: 'OL',
			},
			{
				name: 'View Order',
				path: '/order/view-order',
				iconText: 'EO',
			},
		],
	},
	{
		name: 'Contact',
		icon: 'message',
		children: [
			{
				name: 'Message List',
				path: '/contact/message-list',
				iconText: 'ML',
			},
			{
				name: 'View Message',
				path: '/contact/view-message',
				iconText: 'EM',
			},
		],
	},
	{
		name: 'Sign Out',
		icon: 'meeting_room',
		path: '/others/drag-and-drop',
	},
];
