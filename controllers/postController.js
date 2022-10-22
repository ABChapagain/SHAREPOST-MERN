import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'

// @desc    Get all posts
// route    GET /api/posts
// Access   Private

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
    .populate('user', 'id name email')
    .sort({ createdAt: -1 })

  res.json(posts)
})

// @desc    Get post by id
// route    GET /api/posts/:id
// Access   Private

const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate(
    'user',
    'id name email'
  )

  if (post) {
    res.json(post)
  } else {
    res.status(200)
    throw new Error('Post Not Found')
  }
})

// @desc    Create a post
// route    POST /api/posts
// Access   Private

const createPost = asyncHandler(async (req, res) => {
  const { title, description } = req.body

  if (!title || !description) {
    res.status(400)
    throw new Error('Enter all the fields')
  }
  const post = new Post({
    title,
    description,
    user: req.user._id,
  })

  const createdPost = await post.save()
  res.status(201).json(createdPost)
})

// @desc    Update a post
// route    PUT /api/posts/:id
// Access   Private

const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (post && String(req.user._id) === String(post.user)) {
    post.title = req.body.title
    post.description = req.body.description

    const updatedPost = await post.save()
    res.json(updatedPost)
  } else {
    res.status(400)
    throw new Error('Post not found')
  }
})

// @desc    Delete a post
// route    DELETE /api/posts/:id
// Access   Private

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (post && String(req.user._id) === String(post.user)) {
    await post.remove()
    res.json({ success: true })
  } else {
    res.status(400)
    throw new Error('Post not found')
  }
})

export { getPosts, createPost, updatePost, deletePost, getPostById }
