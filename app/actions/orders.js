import { APP_ORDERS_DATA } from '../constants/app';
import { ordersService } from '../service/orderService';
import { authStorage } from '../helpers/checkAsyncStorage';

/**
 * Записываем данные из ответа в reducer.
 * @param {*} data 
 * @returns 
 */
const setCategoryData = data => ({
	type: APP_ORDERS_DATA,
	payload: data,
});
/**
 * Подгрузка списка.
 * @returns 
 */
export const loadList = () => async (dispatch) => {
	let userStorage = await authStorage(),
		token = userStorage.token;

	await ordersService.getList(token).then((res) => {
		let result = JSON.parse(res.request._response);
		console.log(result)
		dispatch(setCategoryData(result))
	}).catch((err) => {
	});
};
/**
 * Выбор элемента для последующих действий.
 * @param {*} id 
 * @returns 
 */
export const setID = (id) => async (dispatch) => {
	dispatch(setCategoryData({ id }));
}
/**
 * Подгрузка выбранного элемента.
 * @returns 
 */
export const loadSingle = (id) => async (dispatch) => {
	let userStorage = await authStorage(),
		token = userStorage.token;
	await ordersService.getSingle(token, id).then((res) => {
		let result = JSON.parse(res.request._response);
		console.log(result)
		dispatch(setCategoryData({ selected: result.data.order }))
	}).catch((err) => {
	});
};
/**
 * Подгрузка выбранного элемента.
 * @returns 
 */
export const loadCreate = () => async (dispatch) => {
	let userStorage = await authStorage(),
		token = userStorage.token;
	await ordersService.getCreate(token).then((res) => {
		let result = JSON.parse(res.request._response);
		dispatch(setCategoryData({ selected: null }))
		dispatch(setCategoryData({ selected: result.data }))
	}).catch((err) => {
	});
};
/**
 * Подгрузка выбранного элемента.
 * @returns 
 */
export const loadEdit = (id) => async (dispatch) => {
	let userStorage = await authStorage(),
		token = userStorage.token;
	await ordersService.getEdit(token, id).then((res) => {
		let result = JSON.parse(res.request._response);
		dispatch(setCategoryData({ selected: null }))
		dispatch(setCategoryData({ selected: result.data }))
	}).catch((err) => {
	});
};
/**
 * Удаление категории.
 * @param {*} id 
 * @param {*} data 
 * @returns 
 */
export const removeCategory = (id, data) => async (dispatch) => {
	let userStorage = await authStorage(),
		token = userStorage.token;

	await ordersService.removeItem(token, id, data).then((res) => {
		let result = JSON.parse(res.request._response);
		dispatch(setCategoryData(result))
	}).catch((err) => {
	});
};