import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { reviewOrders } from '../actions/orderActions'

function OrderListScreen({ history }) {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.adminOrderHistory)
  const { loading, error, orders } = orderList
  console.log(orders)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.is_superuser) {
      dispatch(reviewOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <div>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>DELIVERED</th>
              <th>DETAILS</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user && order.user.fullname}</td>
                <td>{order.created_date.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>

                <td>
                  {order.isDelieverd ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/orders/${order.id}`}>
                    <Button variant='light' className='btn-sm'>
                      <i
                        className='fas fa-info-circle'
                        style={{ color: 'red' }}
                      ></i>
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default OrderListScreen
