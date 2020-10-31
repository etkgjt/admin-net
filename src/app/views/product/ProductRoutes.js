import { MatxLoadable } from 'matx';
// import ProductList from './ProductList';
// import NewProduct from './NewProduct';
// import ViewProducts from './ViewProduct';
const ProductList = MatxLoadable({
	loader: () => import('./ProductList'),
});
const NewProduct = MatxLoadable({
	loader: () => import('./NewProduct'),
});
const ViewProducts = MatxLoadable({
	loader: () => import('./ViewProduct'),
});

const productRoutes = [
	{
		path: '/product/new-product',
		component: NewProduct,
	},
	{
		path: '/product/product-list',
		component: ProductList,
	},
	{
		path: '/product/view-product',
		component: ViewProducts,
	},
];

export default productRoutes;
