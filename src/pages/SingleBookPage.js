import Message from "../components/Message";
import Rating from "../components/Rating";

import { Link } from "react-router-dom";
import {
  Col,
  Row,
  Card,
  Button,
  ListGroup,
  Image,
  Form,
} from "react-bootstrap";

import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import Loader from "../components/Loader";

import { bookDetailAction, createBookReview } from "../actions/bookActions";

import { useDispatch, useSelector } from "react-redux";

function SingleBookPage({ match, history }) {
  const base = process.env.REACT_APP_IMAGE_URL;
  // short term data stored in local react state
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const id = match.params.id;
  const dispatch = useDispatch();
  const bookDetail = useSelector((state) => state.bookDetail);
  const { loading, book, error } = bookDetail;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const bookReview = useSelector((state) => state.bookReviewCreate);
  const {
    loading: loadingBookReview,
    error: errorBookReview,
    success: successBookReview,
  } = bookReview;

  useEffect(() => {
    dispatch(bookDetailAction(id));
  }, [dispatch]);

  const submitReviewHandler = (e) => {
    e.preventDefault();
    const review = { rating, comment };
    dispatch(createBookReview(match.params.id, review));
  };

  const image = `${base}${book.image}`;

  const numberOfItems = book && book.numberOfItems ? book.numberOfItems : 10;

  // relocate to cart page
  function addToCart() {
    history.push(`/cart/${match.params.id}?qty=${quantity}`);
  }

  return (
    <Fragment>
      <h1> This is a single book page</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <Image src={image} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  {" "}
                  <h3>{book.title}</h3>{" "}
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <h6>{book.description}</h6>{" "}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>Price {book.unit_price} $</ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {book.numberOfItems > 0 ? `In Stock` : "Out of Stock"}
                    </Col>
                  </Row>{" "}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={book.total_rating_value}
                    text={`${book.total_rating_count} ratings`}
                    color={"#f8e825"}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col> Quantity </Col>
                    <Col xs="auto" className="">
                      <Form.Control
                        as="select"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      >
                        {numberOfItems
                          ? Array(5)
                              .fill()
                              .map((_, x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))
                          : Array(10)
                              .fill()
                              .map((_, x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button onClick={addToCart}>Add to cart</Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h4>Reviews</h4>
              {book.reviews && book.reviews.length === 0 && (
                <Message variant="info">No Reviews</Message>
              )}
              <ListGroup variant="flush">
                {book.reviews ? (
                  book.reviews.map((review) => (
                    <ListGroup.Item key={review.id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} color="#f8e825" />
                      <p>{String(review.createdAt).substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))
                ) : (
                  <h1> No reviews </h1>
                )}
                <ListGroup.Item>
                  <h4>Write a review</h4>
                  {successBookReview && (
                    <Message variant="success">Review Submitted</Message>
                  )}
                  {errorBookReview && (
                    <Message variant="danger">{errorBookReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitReviewHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="comment">
                        <Form.Label>Review</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="5"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Button
                        disabled={loadingBookReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="info">
                      Please <Link to="/login">login</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </Fragment>
  );
}

export default SingleBookPage;
