import express from 'express'
import userController from '../controllers/userController.js'
import runAuth from '../middleware/runAuth.js'
const router = express.Router()

//Protected Routes
router.use('/getUser', runAuth )
router.use('/getAllUser', runAuth)
router.use('/changePassword', runAuth)
//Public Routes
router.post('/register', userController.userRegistration)
router.post('/login', userController.userLogin)
router.get('/getUser', userController.getUser)
router.get('/getAllUser', userController.getAllUser)
router.post('/changePassword', userController.changePassword)
export default router