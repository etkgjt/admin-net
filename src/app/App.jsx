// import '../fake-db';
import '../styles/_app.scss';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import MatxTheme from './MatxLayout/MatxTheme/MatxTheme';
import AppContext from './appContext';
import history from 'history.js';

import routes from './RootRoutes';
import { Store } from './redux/Store';
import Auth from './auth/Auth';
import MatxLayout from './MatxLayout/MatxLayout';
import AuthGuard from './auth/AuthGuard';
import MySpinner from 'matx/components/MySpinner';
import MyAlert from 'matx/components/MyAlert';

const App = () => {
	return (
		<AppContext.Provider value={{ routes }}>
			<Provider store={Store}>
				<MatxTheme>
					<MySpinner />
					<MyAlert />
					<Router history={history}>
						{/* <Auth>
							<AuthGuard> */}
						<MatxLayout />
						{/* </AuthGuard>
						</Auth> */}
					</Router>
				</MatxTheme>
			</Provider>
		</AppContext.Provider>
	);
};

export default App;
