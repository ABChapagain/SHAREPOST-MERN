import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSinglePost, deletePost } from '../actions/postActions'
import { Button } from 'react-bootstrap'
import { useEffect } from 'react'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import {
  POST_DELETE_RESET,
  POST_DETAILS_RESET,
} from '../constants/postConstants'

export const PostSingleScreen = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Global states
  const postDetails = useSelector((state) => state.postDetails)
  const { post, loading } = postDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const postDelete = useSelector((state) => state.postDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = postDelete

  useEffect(() => {
    if (!userInfo || !userInfo.id || successDelete) {
      navigate('/')
      dispatch({ type: POST_DELETE_RESET })
      dispatch({ type: POST_DETAILS_RESET })
    } else {
      dispatch(getSinglePost(params.id))
    }
  }, [userInfo, successDelete, navigate, dispatch, params])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deletePost(id))
    }
  }

  return (
    <>
      <Link to='/'>
        <Button variant='light'>Go Back</Button>
      </Link>
      {errorDelete && toast.error(errorDelete)}
      {loadingDelete && <Loader />}
      {loading ? (
        <Loader />
      ) : (
        post &&
        post.user && (
          <>
            <div className='my-3'>
              <h3 className='mb-2'>{post.title}</h3>
              <p className='mb-5'>
                Written by {post.user.name} on {post.createdAt.substring(0, 10)}
              </p>
              <p>{post.description}</p>
            </div>
            <hr />

            {post.user._id === userInfo.id && (
              <div className='d-flex justify-content-between align-items center'>
                <Link to={`/post/${post._id}/edit`}>
                  <Button>Edit</Button>
                </Link>
                <Button onClick={() => deleteHandler(post._id)}>Delete</Button>
              </div>
            )}
          </>
        )
      )}
    </>
  )
}
