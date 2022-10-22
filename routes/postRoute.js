import express from 'express'
const router = express.Router()
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById,
} from '../controllers/postController.js'
import { protect } from '../middlewares/authMiddleware.js'

router.route('/').get(protect, getPosts).post(protect, createPost)
router
  .route('/:id')
  .put(protect, updatePost)
  .delete(protect, deletePost)
  .get(protect, getPostById)

export default router
