import axios from 'axios'

export const bookListAction = (keyword = '') => async (dispatch) => {
  try {
    dispatch({ type: 'BOOK_LIST_REQUEST' })

    const url = `/api/v1/books/${keyword}`

    const { data } = await axios.get(url)
    dispatch({ type: 'BOOK_LIST_REQUEST_SUCCESS', payload: data })
  } catch (error) {
    dispatch({ type: 'BOOK_LIST_REQUEST_FAIL' })
  }
}

export const bookDetailAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'SINGLE_BOOK_REQUEST' })

    const url = `/api/v1/books/${id}`

    const { data } = await axios.get(url)

    dispatch({ type: 'SINGLE_BOOK_REQUEST_SUCCESSFUL', payload: data })
  } catch (error) {
    dispatch({ type: 'SINGLE_BOOK_REQUEST_FAIL' })
  }
}

export const createBookReview = (bookId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: 'BOOK_CREATE_REVIEW_REQUEST',
    })

    const { userInfo } = getState().userLogin

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      `/api/v1/books/${bookId}/reviews/`,
      review,
      config
    )
    dispatch({
      type: 'BOOK_CREATE_REVIEW_SUCCESS',
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: 'BOOK_CREATE_REVIEW_FAIL',
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}

export const createBook = (book) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'BOOK_CREATE_REQUEST',
    })

    const { userInfo } = getState().userLogin

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/v1/books/create/`, book, config)
    dispatch({
      type: 'BOOK_CREATE_SUCCESS',
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: 'BOOK_CREATE_FAIL',
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}
