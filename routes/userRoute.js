import express from 'express'
import { authUser, registerUser } from '../controllers/userController.js'
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(authUser)

export default router
