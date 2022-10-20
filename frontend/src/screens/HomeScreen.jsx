import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import posts from '../datas/posts'

const HomeScreen = () => {
  return (
    <>
      {/* <div
        className='bg-light p-4 justify-content-center align-items-center d-flex flex-column'
        style={{ height: '300px' }}
      >
        <h1>SharePosts</h1>
        <p>Simple social media app made on MERN Stack</p>
      </div> */}
      <div className='align-items-center justify-content-between d-flex'>
        <h1>Posts</h1>
        <Link to='/post/create'>
          <Button type='button'>New Post</Button>
        </Link>
      </div>
      {posts.map((post) => (
        <Card className='my-3'>
          <Card.Body>
            <h3 className='mb-3'>{post.title}</h3>
            <p className='bg-dark text-light px-3 py-1'>
              Written by {post.user.name} on {post.createdAt}
            </p>
            <Card.Text>{post.description}</Card.Text>
            <Link to={`post/${post._id}`}>
              <Button type='button'>More</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </>
  )
}

export default HomeScreen
