import {compose, createStore, applyMiddleware} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
// for more customized logging
// import { loggerMiddleware } from '../middleware/logger'

import {rootSaga} from './root-saga'

import {rootReducer} from './root-reducer'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = 
    [process.env.NODE_ENV === 'development' && logger, 
    sagaMiddleware
    ].filter(Boolean)
// for more customized logging
// const middleWares = [process.env.NODE_ENV === 'development' && loggerMiddleware].filter(
//     Boolean
// )

const composedEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ) || compose

const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares))

//for redux persist for saving in local storage [adjust in index.js as well] 
// export const store = createStore(persistedReducer, undefined, composedEnhancers)

export const store = createStore(persistedReducer, undefined, composedEnhancers)

sagaMiddleware.run(rootSaga)

//for redux persist for saving in local storage
// export const persistor = persistStore(store)