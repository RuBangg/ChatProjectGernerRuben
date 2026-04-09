import express from 'express'
import {addUser, getUsers, getUserFromUsernameAndPassword} from '../controllers/modelController'

const userRouter = express.Router()

userRouter.post('/login', (request, response)=>{
    const {username, password} = request.body
    const user = getUserFromUsernameAndPassword(username, password)
    if (user) {
        request.session.validUser = true
        request.session.username = user.username
        request.session.userLevel = user.userLevel
        request.session.userId = user.id
        console.log(user.userLevel)
    }
    console.log(request.session.validUser)
    response.redirect('/')
})

userRouter.post('/logout', (request,response)=>{
    request.session.destroy()
    response.redirect('/')
})

userRouter.post('/create', (request,response)=>{
    const userLevel = Math.floor(Math.random() * 3) + 1
    const newUser = addUser(request.body.username, request.body.password, new Date(), userLevel)
    console.log(newUser)
    response.redirect('/')
})

userRouter.get('/make', (request,response)=>{
    response.render('makeUserPug')
})

