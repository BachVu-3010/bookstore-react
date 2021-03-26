import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'

function ConfirmOrderPage({ history }) {
  const base = process.env.REACT_APP_IMAGE_URL
  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, error, success } = orderCreate
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cartItems)

  cartItems.itemsPrice = cartItems.cartItems
    .reduce((accumulator, item) => accumulator + item.unit_price * item.qty, 0)
    .toFixed(2)

  cartItems.shippingPrice = (cartItems.itemsPrice > 100
    ? 0
    : Number(0.05 * cartItems.itemsPrice)
  ).toFixed(2)

  cartItems.taxPrice = Number(0.1 * cartItems.itemsPrice).toFixed(2)

  cartItems.totalPrice = (
    Number(cartItems.itemsPrice) +
    Number(cartItems.shippingPrice) +
    Number(cartItems.taxPrice)
  ).toFixed(2)

  if (!cartItems.paymentMethod) {
    cartItems.paymentMethod = 'Visa Card'
  }

  useEffect(() => {
    if (success) {
      dispatch({ type: 'ORDER_CREATE_RESET' })
      history.push(`/orders/${order.id}`)
    }
  }, [success, history])

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cartItems.cartItems,
        shippingAddress: cartItems.shippingAddress,
        paymentMethod: cartItems.paymentMethod,
        itemsPrice: cartItems.itemsPrice,
        shippingPrice: cartItems.shippingPrice,
        taxPrice: cartItems.taxPrice,
        totalPrice: cartItems.totalPrice,
      })
    )
  }

  return (
    <div>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>

              <p>
                <strong>Shipping: </strong>
                {cartItems.shippingAddress.address},{' '}
                {cartItems.shippingAddress.city},{' '}
                {cartItems.shippingAddress.city},{' '}
                {cartItems.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cartItems.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.cartItems.length === 0 ? (
                <Message variant='info'>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cartItems.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={`${base}${item.image}`} fluid rounded />
                        </Col>

                        <Col>
                          <Link to={`/books/${item.id}`}>{item.title}</Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} X ${item.unit_price} = $
                          {(item.qty * item.unit_price).toFixed(2)}
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
                  <Col>${cartItems.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cartItems.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cartItems.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${cartItems.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.cartItems === 0}
                  onClick={placeOrder}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ConfirmOrderPage
