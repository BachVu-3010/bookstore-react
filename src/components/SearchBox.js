import React, { useState } from 'react'
import { Form, FormControl, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function SearchBox() {
  const [keyword, setKeyWord] = useState('')
  const history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Searching keyword', { keyword })
    history.push(`/?keyword=${keyword}`)
  }
  return (
    <Form inline onSubmit={handleSubmit}>
      <FormControl
        onChange={(e) => setKeyWord(e.target.value)}
        type='text'
        placeholder='Search'
        className='mr-sm-2'
      />
      <Button type='submit' variant='outline-success'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
