import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  bookListReducer,
  bookDetailReducer,
  bookReviewCreateReducer,
} from './reducers/bookReducers'
import { cartReducer } from './reducers/cartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userUpdateReducer,
  userDeleteReducer,
} from './reducers/userReducers'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderHistoryReducer,
  adminOrderHistoryReducer,
} from './reducers/orderReducers'

const reducer = combineReducers({
  // sub-state bookListReducer managed by bookListReducer
  bookList: bookListReducer,
  bookDetail: bookDetailReducer,
  cartItems: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  bookReviewCreate: bookReviewCreateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderHistorry: orderHistoryReducer,
  adminOrderHistory: adminOrderHistoryReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initState = {
  cartItems: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
