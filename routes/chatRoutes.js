import express from 'express'
import {addChat, getChatFromId, getUserFromId, addMessage, deleteMessage} from '../controllers/modelController.js'

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

chatRouter.delete('/:id', async (request, response) => {
    console.log("we got here");
    try {
        const msgId = parseInt(request.params.id);
        await deleteMessage(msgId);
        response.sendStatus(200);
    } catch (error) {
        console.error("DELETE ERROR:", error);
        response.status(500).send("Something broke");
    }
})

chatRouter.get('/:id/messages', (request, response)=>{
    
})

chatRouter.get('/:id/messages/:id', (request, response)=>{
    
})

chatRouter.post('/:id/sendMessage', async (request, response) => {
    const chatId = parseInt(request.params.id)
    const user = getUserFromId(request.session.userId)
    await addMessage(request.body.message, user, chatId)
    response.redirect(`/chats/${chatId}`)
})



export default chatRouter