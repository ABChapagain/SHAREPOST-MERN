import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div
      className='bg-light p-4 justify-content-center align-items-center d-flex flex-column'
      style={{ height: '300px' }}
    >
      <h1>404! Page Not Found</h1>
      <p>
        <Link to='/'>Click Here</Link> to go home.
      </p>
    </div>
  )
}

export default NotFound
