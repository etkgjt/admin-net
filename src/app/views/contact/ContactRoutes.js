import { MatxLoadable } from 'matx';

const MessageList = MatxLoadable({
	loader: () => import('./MessageList'),
});
const ViewMessage = MatxLoadable({
	loader: () => import('./ViewMessage'),
});

const contactRoutes = [
	{
		path: '/contact/message-list',
		component: MessageList,
	},
	{
		path: '/contact/view-message',
		component: ViewMessage,
	},
];

export default contactRoutes;
