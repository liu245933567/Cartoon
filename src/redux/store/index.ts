import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';

/**
 * 通过createStoreWithMdwareAPI创建createStore
 * 1 包裹一个createStore方法 2 包裹扩展redux的中间件
 * thunkMiddleware中间件为了让reduc支持处理异步的action
 */
const createStoreWithMdware = applyMiddleware(thunkMiddleware)(createStore);

const store = createStoreWithMdware(reducers);

export default store;
