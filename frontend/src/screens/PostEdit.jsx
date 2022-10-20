import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getSinglePost, updatePost } from '../actions/postActions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Loader from '../components/Loader'
import { POST_UPDATE_RESET } from '../constants/postConstants'
import { toast } from 'react-toastify'

const PostEdit = () => {
  const params = useParams()
  const postId = params.id
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  // Global states
  const postDetails = useSelector((state) => state.postDetails)
  const { post, loading } = postDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const postUpdate = useSelector((state) => state.postUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = postUpdate

  useEffect(() => {
    if (!userInfo || !userInfo.id || post.user._id !== userInfo.id) {
      navigate('/')
    } else {
      if (successUpdate) {
        navigate('/')
        dispatch({ type: POST_UPDATE_RESET })
      } else {
        if (!post || post._id !== postId) {
          dispatch(getSinglePost(postId))
        } else {
          setTitle(post.title)
          setDescription(post.description)
        }
      }
    }
  }, [post, postId, dispatch, navigate, successUpdate, userInfo])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updatePost(postId, { title, description }))
  }

  return (
    <>
      <Link to={`/post/${params.id}`}>
        <Button variant='light'>Go Back</Button>
      </Link>
      <h1 className='py-3'>Edit Post</h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && toast.error(errorUpdate)}
      {loading ? (
        <Loader />
      ) : (
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
            Update
          </Button>
        </Form>
      )}
    </>
  )
}

export default PostEdit
