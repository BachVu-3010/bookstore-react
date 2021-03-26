import { Card } from 'react-bootstrap'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'

function Book({ book }) {
  const base = process.env.REACT_APP_IMAGE_URL
  const image = `${base}${book.image}`

  let title = book.title
  let renderedTitle = title.length >= 30 ? `${title.slice(0, 30)}` : title
  let description = book.description
  let renderedDescription =
    description.length >= 50 ? `${description.slice(0, 50)} ...` : description

  return (
    <Card className='my-3 p-3 rounded' style={{ height: '35rem' }}>
      <Link to={`/books/${book.id}`}>
        <Card.Img src={image} style={{ height: '18rem' }} />
      </Link>
      <Card.Body>
        <Card.Title> {renderedTitle}</Card.Title>
        <Card.Text> {renderedDescription}</Card.Text>
        <Card.Text>
          {book.total_rating_value} from {book.total_rating_count} reviews
        </Card.Text>
        <Card.Text> Price {book.unit_price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Book
