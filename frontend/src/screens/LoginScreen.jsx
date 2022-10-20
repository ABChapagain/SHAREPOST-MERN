import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import { login } from '../actions/userActions'

const LoginScreen = () => {
  // State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Global state
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, success, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.id) {
      navigate('/')
    }
    if (success) {
      toast.success('Login is successful.❤️')
    } else if (error) {
      toast.error(error)
    }
  }, [navigate, userInfo, success, error])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('All fields are required.😞')
    } else {
      dispatch(login(email, password))
    }
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {loading && <Loader />}
      <Form className='mt-4' onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            value={email}
            placeholder='Enter email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            value={password}
            placeholder='Enter Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Check
            type='checkbox'
            label='Show Password'
            onClick={(e) => setShowPassword(e.target.checked)}
          />
        </Form.Group>
        <Button type='submit' variant='primary' disabled={loading}>
          Login
        </Button>
      </Form>
      <Row className='py-3'>
        <Col md={6}>
          New Customer? <Link to='/register'>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
