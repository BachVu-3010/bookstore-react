import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Footer from './components/Footer'
import Header from './components/Header'

import HomePage from './pages/HomePage'
import ShoppingCartPage from './pages/ShoppingCartPage'
import SingleBookPage from './pages/SingleBookPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import CheckoutPage from './pages/CheckoutPage'
import ConfirmOrderPage from './pages/ConfirmOrderPage'
import ViewOrderPage from './pages/ViewOrderPage'
import AdminViewUsersPage from './pages/AdminViewUsersPage'
import AdminEditUserPage from './pages/AdminEditUserPage'
import AdminAddBookPage from './pages/AdminAddBookPage'
import AdminViewOrdersPage from './pages/AdminViewOrdersPage'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Bach Vu bookstore project</h1>
          <Route path='/' component={HomePage} exact />
          <Route path='/books/:id' component={SingleBookPage} />
          <Route path='/cart/:id?' component={ShoppingCartPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/profile' component={ProfilePage} />
          <Route path='/checkout' component={CheckoutPage} />
          <Route path='/confirm-order' component={ConfirmOrderPage} />
          <Route path='/orders/:id' component={ViewOrderPage} />
          <Route path='/admin/users' component={AdminViewUsersPage} />
          <Route path='/admin/users/:id/edit' component={AdminEditUserPage} />
          {/* <Route path='/admin/books/:id/edit' component={AdminEditUserPage} /> */}
          <Route path='/admin/books/add' component={AdminAddBookPage} />
          <Route path='/admin/orders' component={AdminViewOrdersPage} />
        </Container>
      </main>

      <Footer />
    </Router>
  )
}

export default App
