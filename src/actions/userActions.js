import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'USER_LOGIN_REQUEST',
    })

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/v1/users/login/',
      { email: email, password: password },
      config
    )

    dispatch({
      type: 'USER_LOGIN_SUCCESS',
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}

export const register = (email, password, fullname, birthday, phone) => async (
  dispatch
) => {
  try {
    dispatch({
      type: 'USER_REGISTER_REQUEST',
    })

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/v1/users/register/',
      {
        email: email,
        password: password,
        fullname: fullname,
        birthday: birthday,
        phone: phone,
      },
      config
    )

    dispatch({
      type: 'USER_REGISTER_SUCCESS',
      payload: data,
    })

    dispatch({
      type: 'USER_LOGIN_SUCCESS',
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    // dispatch({
    //   type: 'USER_REGISTER_FAIL',
    //   payload:
    //     error.response && error.response.data.detail
    //       ? error.response.data.detail
    //       : error.message,
    // })
    console.log('register error')
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: 'USER_LOGOUT' })
  // dispatch({ type: USER_DETAILS_RESET })
  // dispatch({ type: ORDER_LIST_MY_RESET })
  // dispatch({ type: USER_LIST_RESET })
}

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'GET_USER_DETAILS_REQUEST',
    })

    const userInfo = getState().userLogin.userInfo

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // id = Either a number or "profile"
    const { data } = await axios.get(`/api/v1/users/${id}/`, config)

    dispatch({
      type: 'GET_USER_DETAILS_SUCCESS',
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: 'GET_USER_DETAILS_FAIL',
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}

export const updateUserProfile = (update_data) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: 'USER_UPDATE_PROFILE_REQUEST',
    })

    const userInfo = getState().userLogin.userInfo

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/v1/users/profile/update/`,
      update_data,
      config
    )

    dispatch({
      type: 'USER_UPDATE_PROFILE_SUCCESS',
      payload: data,
    })

    dispatch({
      type: 'USER_LOGIN_SUCCESS',
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: 'USER_UPDATE_PROFILE_FAIL',
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'USER_LIST_REQUEST',
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

    const { data } = await axios.get(`/api/v1/users/`, config)

    dispatch({
      type: 'USER_LIST_SUCCESS',
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: 'USER_LIST_FAIL',
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'USER_DELETE_REQUEST',
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

    const { data } = await axios.delete(`/api/v1/users/delete/${id}/`, config)

    dispatch({
      type: 'USER_DELETE_SUCCESS',
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: 'USER_DELETE_FAIL',
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'USER_UPDATE_REQUEST',
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

    const { data } = await axios.put(
      `/api/v1/users/update/${user._id}/`,
      user,
      config
    )

    dispatch({
      type: 'USER_UPDATE_SUCCESS',
    })

    dispatch({
      type: 'USER_DETAILS_SUCCESS',
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: 'USER_UPDATE_FAIL',
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}
