import React, { useState, useEffect, Fragment } from 'react'
import { Row, Col, Image, Button, Form } from 'react-bootstrap'

import { addItemToCardAction, removeFromCart } from '../actions/cartActions'

import { useDispatch, useSelector } from 'react-redux'

function ShoppingCartPage({ history, match, location }) {
  const base = process.env.REACT_APP_IMAGE_URL
  const id = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cartItems.cartItems)

  const numberOfItems =
    cartItems && cartItems.numberOfItems ? cartItems.numberOfItems : 5

  useEffect(() => {
    if (id) {
      dispatch(addItemToCardAction(id, qty))
    }
  }, [dispatch, id, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  function handleCheckOut() {
    console.log('This function handles checkout')
    history.push('/login?redirect=checkout')
  }

  console.log(cartItems.length)

  function calculateTotalPrice() {
    let totalPrice = 0
    for (let i = 0; i < cartItems.length; i++) {
      totalPrice += Number(cartItems[i].qty) * Number(cartItems[i].unit_price)
    }

    return totalPrice
  }

  return (
    <Fragment>
      <h1> Shopping Cart</h1>
      <div>
        {cartItems && cartItems.length > 0 ? (
          <Row>
            <Col md={9}>
              <Row>
                <Col md={10}></Col>
                <Col md={2}>
                  <h5> Unit Price </h5>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  {cartItems.map((item, index) => (
                    <Row key={item.id}>
                      <Col md={4}>
                        <Image src={`${base}${item.image}`} fluid />
                      </Col>
                      <Col md={4}>
                        <h6> {item.title}</h6>
                      </Col>
                      <Col md={4}>
                        <Row>
                          <Col md={7}>
                            <Form.Control
                              as='select'
                              value={item.qty}
                              onChange={(e) =>
                                dispatch(
                                  addItemToCardAction(item.id, e.target.value)
                                )
                              }
                            >
                              {Array(numberOfItems)
                                .fill()
                                .map((_, x) =>
                                  x === 0 ? (
                                    <option key={x} value={x}>
                                      {x} (delete)
                                    </option>
                                  ) : (
                                    <option key={x} value={x}>
                                      {x}
                                    </option>
                                  )
                                )}
                            </Form.Control>
                          </Col>
                          <Col md={5}>
                            <h6> {item.unit_price} </h6>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  ))}
                </Col>
              </Row>
            </Col>
            <Col md={3}>
              <h3> Checkout</h3>
              <h5>
                {' '}
                Subtotals({cartItems.length} items): {calculateTotalPrice()} ${' '}
              </h5>
              <Button onClick={handleCheckOut}> Proceed to checkout</Button>
            </Col>
          </Row>
        ) : (
          <h1> Your cart is empty </h1>
        )}
      </div>
    </Fragment>
  )
}

export default ShoppingCartPage

/* <Col md={1}>
<Button
    type='button'
    variant='light'
    onClick={() => removeFromCartHandler(item.product)}
>
    <i className='fas fa-trash'></i>
</Button>
</Col> */
