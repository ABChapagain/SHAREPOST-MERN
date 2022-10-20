import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const PostEdit = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Link to='/'>
        <Button variant='light'>Go Back</Button>
      </Link>
      <h1 className='py-3'>Edit Post</h1>
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
    </>
  )
}

export default PostEdit
