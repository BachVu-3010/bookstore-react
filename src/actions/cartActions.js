import axios from 'axios'

// dispatch is to send action, getState to get data from store
export const addItemToCardAction = (id, qty) => async (dispatch, getState) => {
  try {
    // dispatch({ type: 'REQUEST_LOADING_CART' })
    console.log(id)
    const url = `/api/v1/books/${id}`
    const { data } = await axios.get(url)

    console.log(data)

    dispatch({
      type: 'LOADING_CART_SUCCESSFUL',
      payload: {
        id: data.id,
        title: data.title,
        image: data.image,
        description: data.description,
        unit_price: data.unit_price,
        countInStock: data.numberOfItems ? data.numberOfItems : 10,
        qty: qty,
      },
    })
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cartItems.cartItems)
    )
  } catch {
    // dispatch({ type: 'LOADING_CART_FAIL' })
    console.log('error add-item-to-cart')
  }
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: 'CART_REMOVE_ITEM',
    payload: id,
  })

  localStorage.setItem(
    'cartItems',
    JSON.stringify(getState().cartItems.cartItems)
  )
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: 'CART_SAVE_SHIPPING_ADDRESS',
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: 'CART_SAVE_PAYMENT_METHOD',
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
