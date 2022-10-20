import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'

import { getPosts } from '../actions/postActions'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const postList = useSelector((state) => state.postList)
  const { loading, error, posts } = postList

  useEffect(() => {
    if (!userInfo || !userInfo.id) {
      navigate('/')
    } else {
      dispatch(getPosts())
    }
  }, [userInfo, dispatch, navigate])

  return (
    <>
      {userInfo && userInfo.id ? (
        <>
          <div className='align-items-center justify-content-between d-flex'>
            <h1>Posts</h1>
            <Link to='/post/create'>
              <Button type='button'>New Post</Button>
            </Link>
          </div>

          {loading && <Loader />}
          {error && toast.error(error)}
          {posts.length === 0 ? (
            <div
              className='justify-content-center align-items-center d-flex text-center'
              style={{ height: '400px' }}
            >
              <h4>No posts available.</h4>
            </div>
          ) : (
            posts.map((post) => (
              <Card key={post._id} className='my-3'>
                <Card.Body>
                  <h3 className='mb-3'>{post.title}</h3>
                  <p className='bg-dark text-light px-3 py-1'>
                    Written by {post.user.name} on{' '}
                    {post.createdAt.substring(0, 10)} Email:{' '}
                    <a
                      className='text-decoration-none text-light'
                      href={`mailto: ${post.user.email}`}
                    >
                      {post.user.email}
                    </a>
                  </p>
                  <Card.Text>{post.description}</Card.Text>
                  <Link to={`post/${post._id}`}>
                    <Button type='button'>More</Button>
                  </Link>
                </Card.Body>
              </Card>
            ))
          )}
        </>
      ) : (
        <div
          className='bg-light p-4 justify-content-center align-items-center d-flex flex-column'
          style={{ height: '300px' }}
        >
          <h1>SharePosts</h1>
          <p>Simple social media app made on MERN Stack</p>
          <p>
            <Link to='/login'>Login</Link> to view posts.
          </p>
        </div>
      )}
    </>
  )
}

export default HomeScreen
