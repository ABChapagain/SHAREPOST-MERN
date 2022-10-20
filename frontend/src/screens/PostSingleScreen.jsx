import React from 'react'
import { Link } from 'react-router-dom'
import {  Button } from 'react-bootstrap'

import posts from '../datas/posts'

export const PostSingleScreen = () => {
  const post = posts[0]

  return (
    <>
      <Link to='/'>
        <Button variant='light'>Go Back</Button>
      </Link>
      <div className='my-3'>
        <h3 className='mb-2'>{post.title}</h3>
        <p className='mb-5'>
          Written by {post.user.name} on {post.createdAt}
        </p>
        <p>{post.description}</p>
      </div>
      <hr />
      <div className="d-flex justify-content-between align-items center">
        <Link to={`/post/${post._id}/edit`}>
            <Button>Edit</Button>
        </Link>
        <Button >Delete</Button>
      </div>
    </>
  )
}
