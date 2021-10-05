import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './auth';
import categoriesReducer from './categories';
import dashboardReducer from './dashboard';
import productsReducer from './products';
import attributesReducer from './attributes';
import ordersReducer from './orders';

const reducers = combineReducers({
	auth: authReducer,
	categories: categoriesReducer,
	dashboard: dashboardReducer,
	products: productsReducer,
	attributes: attributesReducer,
	orders: ordersReducer,
});

const middleware = [thunk];

const store = createStore(
	reducers,
	{},
	composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
