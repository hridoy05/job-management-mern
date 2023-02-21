import express from 'express'
const router = express.Router()
import rateLimiter from 'express-rate-limit'
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many requests from this IP, please try again after 15 minutes',
})

import { HttpRegister, HttpLogin, HttpUpdateUser} from '../controllers/authController.js'
import authenticateUser from '../middleware/auth.js'
router.route('/register').post(apiLimiter, HttpRegister)
router.route('/login').post(apiLimiter, HttpLogin)
router.route('/updateUser').patch(authenticateUser, HttpUpdateUser)

export default router
