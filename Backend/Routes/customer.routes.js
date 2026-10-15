const express=require('express')
const router=express.Router()

const customerController=require('../Controller/customer.controller.js')
const customerMiddleware=require('../Middlewares/auth.middleware.js')

//For Register
router.post('/register',customerController.registerCustomer)

//For Login
router.post('/login',customerController.loginCustomer)

//For My Profile
router.get('/my',customerMiddleware.protect,customerController.getMyProfile)

//For Changing Password
router.put('/changePassword',customerController.changePassword)

//For Log out
router.post('/logout',customerController.logoutCustomer)

module.exports=router

