// Note Every test file should end with .test.js extension.
// import React from 'react'
// import ReactDOM from 'react-dom'

// import { render, screen } from '@testing-library/react'
// import App from './App'

// it('renders without crashing', () => {
//   const div = document.createElement('div')
//   ReactDOM.render(<App />, div)
// })

// test('renders learn react link', () => {
//   render(<App />)
//   const linkElement = screen.getByText(/Bach Vu bookstore project/i)
//   expect(linkElement).toBeInTheDocument()
// })

const add = (a, b) => a + b

test('function add should return the sum', () => {
  const sum = add(3, 4)
  expect(sum).toBe(7)
})
