import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUser } from '../actions/userActions'

function AdminEditUserPage({ match, history }) {
  const userId = match.params.id
  const [fullname, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [isSuperUser, setIsSuperUser] = useState(false)
  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails)
  const { error, loading, user } = userDetails
  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: 'USER_UPDATE_RESET' })
      history.push('/admin/users')
    } else {
      if (!user.fullname || user.id !== Number(userId)) {
        dispatch(getUserDetails(userId))
      } else {
        setFullName(user.fullname)
        setEmail(user.email)
        setIsSuperUser(user.is_superuser)
      }
    }
  }, [user, userId, successUpdate, history])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateUser({
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        is_superuser: user.is_superuser,
      })
    )
  }

  return (
    <div>
      <Link to='/admin/users'>Close</Link>

      <div>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='fullname'>
              <Form.Label>FullName</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter fullname'
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='is_superuser'>
              <Form.Check
                type='checkbox'
                label='Is Superuser'
                checked={isSuperUser}
                onChange={(e) => setIsSuperUser(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </div>
    </div>
  )
}

export default AdminEditUserPage
