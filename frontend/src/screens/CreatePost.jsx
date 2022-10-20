import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Loader from '../components/Loader'
import { createPost } from '../actions/postActions'
import { toast } from 'react-toastify'
import { POST_CREATE_RESET } from '../constants/postConstants'

const CreatePost = () => {
  // Component state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const postCreate = useSelector((state) => state.postCreate)
  const { loading, error, success } = postCreate

  useEffect(() => {
    if (!userInfo || !userInfo.id) {
      navigate('/')
    }
    if (success) {
      dispatch({ type: POST_CREATE_RESET })
      toast.success('Post created successfully.🔥')
      navigate('/')
    }
  }, [success, navigate, dispatch, userInfo])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createPost(title, description))
  }

  return (
    <>
      <Link to='/'>
        <Button variant='light'>Go Back</Button>
      </Link>
      <h1 className='py-3'>New Post</h1>
      {loading && <Loader />}
      {error && toast.error(error)}
      <Form className='mt-4' onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            value={title}
            placeholder='Enter Title'
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            value={description}
            placeholder='Enter Description'
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Button type='submit' variant='primary'>
          Submit
        </Button>
      </Form>
    </>
  )
}

export default CreatePost
