import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderActions'

function ViewOrderPage({ match, history }) {
  const base = process.env.REACT_APP_IMAGE_URL
  const orderId = match.params.id
  const dispatch = useDispatch()
  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, error, loading } = orderDetails
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading && !error) {
    console.log(order, orderId)
    order.itemsPrice = order.order_book
      .reduce((accumulator, item) => accumulator + item.price * item.qty, 0)
      .toFixed(2)
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    if (!order || order.id !== Number(orderId)) {
      dispatch(getOrderDetails(orderId))
      console.log(order.order_book)
    }
  }, [dispatch, order, orderId])

  // return <p1> This is order page</p1>

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <div>
      <h1>Order: {orderId}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.fullname}
              </p>
              <p>
                <strong>Email: </strong>
                <a href=''>{order.user.email}</a>
              </p>
              <p>
                <strong>Shipping: </strong>
                {order.shippingAddress.address},{' '}
                {order.shippingAddress.district}
                {'  '}
                {order.shippingAddress.city},{'  '}
                {order.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.order_book.length === 0 ? (
                <Message variant='info'>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.order_book.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={`${base}${item.image}`} fluid rounded />
                        </Col>

                        <Col>
                          <Link to={`/books/${item.id}`}>{item.name}</Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} X ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ViewOrderPage
