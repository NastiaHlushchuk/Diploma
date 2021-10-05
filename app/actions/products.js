import { APP_PRODUCT_DATA } from '../constants/app';
import { productService } from '../service/productService';
import { authStorage } from '../helpers/checkAsyncStorage';

/**
 * Записываем данные из ответа в reducer.
 * @param {*} data 
 * @returns 
 */
const setProductData = data => ({
	type: APP_PRODUCT_DATA,
	payload: data,
});
/**
 * Подгрузка списка.
 * @returns 
 */
export const loadList = () => async (dispatch) => {
	let userStorage = await authStorage(),
		token = userStorage.token;

	await productService.getList(token).then((res) => {
		let result = JSON.parse(res.request._response);
		console.log("Fuck",result)
		dispatch(setProductData(result))
	}).catch((err) => {
	});
};
/**
 * Выбор элемента для последующих действий.
 * @param {*} id 
 * @returns 
 */
export const setID = (id) => async (dispatch) => {
	dispatch(setProductData({ id }));
}
/**
 * Подгрузка выбранного элемента.
 * @returns 
 */
export const loadSingle = (id) => async (dispatch) => {
	let userStorage = await authStorage(),
		token = userStorage.token;
	await productService.getSingle(token, id).then((res) => {
		let result = JSON.parse(res.request._response);
		dispatch(setProductData({ selected: result.data.product }))
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
	await productService.getCreate(token).then((res) => {
		let result = JSON.parse(res.request._response);
		dispatch(setProductData({ selected: null }))
		dispatch(setProductData({ selected: result.data }))
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
	await productService.getEdit(token, id).then((res) => {
		let result = JSON.parse(res.request._response);
		dispatch(setProductData({ selected: null }))
		dispatch(setProductData({ selected: result.data }))
	}).catch((err) => {
	});
};
/**
 * Удаление категории.
 * @param {*} id 
 * @param {*} data 
 * @returns 
 */
export const removeProduct = (id, data) => async (dispatch) => {
	let userStorage = await authStorage(),
		token = userStorage.token;

	await productService.removeItem(token, id, data).then((res) => {
		let result = JSON.parse(res.request._response);
		dispatch(setProductData(result))
	}).catch((err) => {
	});
};