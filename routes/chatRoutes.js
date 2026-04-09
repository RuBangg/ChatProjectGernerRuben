import express from 'express'
import {addChat, getChatFromId, getUserFromId, addMessage} from '../controllers/modelController.js'

const chatRouter = express.Router()

chatRouter.get('/', (request, response)=>{
    response.redirect('/')
})

chatRouter.post('/newChat', async (request, response)=>{
    const user = getUserFromId(request.session.userId)
    await addChat(request.body.name, new Date(), user)
    response.redirect('/')
})

chatRouter.get('/:id', (request, response)=>{
    if (request.session.validUser) {
        const id = parseInt(request.params.id)
        const chat = getChatFromId(id)
        const user = getUserFromId(request.session.userId)
        response.render('chat', {chat, user})
    } else {
        response.redirect('/')
    }
})

chatRouter.post('/:id/sendMessage', (request, response) => {
    const id = parseInt(request.params.id)
    const chat = getChatFromId(id)
    const user = getUserFromId(request.session.userId)
    addMessage(request.body.message, user, chat)
    response.redirect(`/chat/${id}`)
})

export default chatRouter