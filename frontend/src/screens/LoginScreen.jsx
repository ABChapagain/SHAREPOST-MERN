import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
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
        <Button type='submit' variant='primary'>
          Login
        </Button>
      </Form>
      <Row className='py-3'>
        <Col md={6}>
          New Customer?{' '}
          <Link to='/register'>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
