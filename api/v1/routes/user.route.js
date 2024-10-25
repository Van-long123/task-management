const express = require('express');
const router=express.Router();
const controller=require('../controllers/user.controller')
const authMiddleware=require('../middlewares/auth.middleware')
const validate=require('../validates/user.validate')
router.post('/register',validate.register,controller.register)
router.post('/login',validate.login,controller.login)
router.post('/password/forgot',validate.forgotPassword,controller.forgotPassword)
router.post('/password/otp',validate.otp,controller.passwordOtp)
router.post('/password/reset',validate.resetPassword,controller.resetPassword)
router.get('/detail',authMiddleware.requireAuth,controller.detail)
router.get('/list',authMiddleware.requireAuth,controller.list)


module.exports = router