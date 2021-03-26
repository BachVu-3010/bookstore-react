import axios from 'axios'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'ORDER_CREATE_REQUEST',
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/v1/orders/create/`, order, config)

    dispatch({
      type: 'ORDER_CREATE_SUCCESS',
      payload: data,
    })

    dispatch({
      type: 'CART_CLEAR_ITEMS',
      payload: data,
    })

    localStorage.removeItem('cartItems')
  } catch (error) {
    dispatch({
      type: 'ORDER_CREATE_FAIL',
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'ORDER_DETAILS_REQUEST',
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/v1/orders/${id}/`, config)

    dispatch({
      type: 'ORDER_DETAILS_SUCCESS',
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: 'ORDER_DETAILS_FAIL',
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}

export const reviewHistoryOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'ORDER_HISTORY_REVIEW_REQUEST',
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/v1/orders/myorders/`, config)

    dispatch({
      type: 'ORDER_HISTORY_REVIEW_SUCCESS',
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: 'ORDER_HISTORY_REVIEW_FAIL',
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}

export const reviewOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'ORDER_LIST_REQUEST',
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/v1/orders/`, config)

    dispatch({
      type: 'ORDER_LIST_SUCCESS',
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: 'ORDER_LIST_FAIL',
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}
