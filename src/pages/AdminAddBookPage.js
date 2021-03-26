import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { createBook } from '../actions/bookActions'

function AdminAddBookPage({ location, history }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [publisherName, setPublisherName] = useState('')
  const [publishedDate, setPublishedDate] = useState('')
  const [unitPrice, setUnitPrice] = useState('')
  const [image, setImage] = useState()
  const [numberOfItems, setNumberOfItems] = useState('')
  const [totalRatingValue, setTotalRatingValue] = useState(0.0)
  const [totalRatingCount, setTotalRatingCount] = useState(0)
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { error, loading, userInfo } = userRegister

  useEffect(() => {
    if (userInfo) {
      history.push('/') // redirect to the main page
    }
  }, [history, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createBook({
        title,
        description,
        authorName,
        publisherName,
        publishedDate,
        unitPrice,
        image,
        numberOfItems,
        totalRatingValue,
        totalRatingCount,
      })
    )
  }

  return (
    <div>
      <h1>Enter new book info</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='title'>
          <Form.Label>Book Title</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='authorName'>
          <Form.Label>Author Name</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter Author name'
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='publisherName'>
          <Form.Label>Publisher Name</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter Publisher Name'
            value={publisherName}
            onChange={(e) => setPublisherName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='publishedDate'>
          <Form.Label>Published Date</Form.Label>
          <Form.Control
            required
            type='date'
            placeholder='yyyy-mm-dd'
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='unitPrice'>
          <Form.Label>Unit price</Form.Label>
          <Form.Control
            required
            type='number'
            placeholder='$'
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='numberOfItems'>
          <Form.Label>Number of items</Form.Label>
          <Form.Control
            required
            type='number'
            value={numberOfItems}
            onChange={(e) => setNumberOfItems(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='totalRatingValue'>
          <Form.Label>Total rating value</Form.Label>
          <Form.Control
            required
            type='number'
            placeholder='<5'
            value={totalRatingValue}
            onChange={(e) => setTotalRatingValue(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='totalRatingCount'>
          <Form.Label>Total rating count</Form.Label>
          <Form.Control
            required
            type='number'
            placeholder='0'
            value={totalRatingCount}
            onChange={(e) => setTotalRatingCount(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='image'>
          <Form.Label>Image</Form.Label>
          <Form.Control
            required
            type='file'
            onChange={(e) => setImage(e.target.files[0].name)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Add book
        </Button>
      </Form>
    </div>
  )
}

export default AdminAddBookPage
