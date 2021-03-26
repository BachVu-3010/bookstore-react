export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ORDER_CREATE_REQUEST':
      return {
        loading: true,
      }

    case 'ORDER_CREATE_SUCCESS':
      return {
        loading: false,
        success: true,
        order: action.payload,
      }

    case 'ORDER_CREATE_FAIL':
      return {
        loading: false,
        error: action.payload,
      }

    case 'ORDER_CREATE_RESET':
      return {}

    default:
      return state
  }
}

export const orderDetailsReducer = (
  state = { loading: true, order: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case 'ORDER_DETAILS_REQUEST':
      return {
        ...state,
        loading: true,
      }

    case 'ORDER_DETAILS_SUCCESS':
      return {
        loading: false,
        order: action.payload,
      }

    case 'ORDER_DETAILS_FAIL':
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const orderHistoryReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case 'ORDER_HISTORY_REVIEW_REQUEST':
      return {
        loading: true,
      }

    case 'ORDER_HISTORY_REVIEW_SUCCESS':
      return {
        loading: false,
        orders: action.payload,
      }

    case 'ORDER_HISTORY_REVIEW_FAIL':
      return {
        loading: false,
        error: action.payload,
      }

    case 'ORDER_HISTORY_REVIEW_RESET':
      return {
        orders: [],
      }

    default:
      return state
  }
}

export const adminOrderHistoryReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case 'ORDER_LIST_REQUEST':
      return {
        loading: true,
      }

    case 'ORDER_LIST_SUCCESS':
      return {
        loading: false,
        orders: action.payload,
      }

    case 'ORDER_LIST_FAILL':
      return {
        loading: false,
        error: action.payload,
      }

    case 'ORDER_LIST_RESET':
      return {
        orders: [],
      }

    default:
      return state
  }
}
