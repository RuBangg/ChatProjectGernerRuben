import express, { request, response } from "express"
import session from "express-session"
import  User  from "./models/user.js"
import  Chat  from "./models/chat.js"
import  Message  from "./models/message.js"
const app = express()

 
app.set('view engine', 'pug')
app.use(express.static('assets'))
app.use(express.urlencoded())
app.use(session({
    secret: 'Blablablalala',
    saveUninitialized: true,
    resave: true
}))

let users = [new User('Gerner', '123', new Date(), 3), new User('Ruben','321',new Date(Date.now()),3)]
let chats = [new Chat('Gerners chatrum om chatrum', new Date(), users[0]), new Chat('Ruben chatter', new Date(), users[1])]

chats[0].messagesHistory[0] = new Message('sikke flot vjer vi har',users[0],chats[0])
chats[0].messagesHistory[1] = new Message('du har vist ikke kigget ud af vinduet',users[1],chats[0])
chats[0].messagesHistory[2] = new Message('jeg elsker rengvjer',users[0],chats[0])
chats[0].messagesHistory[3] = new Message('suk',users[1],chats[0])

console.log(users)

app.get('/', (request, response)=>{
    const validUser = request.session.validUser
    const username = request.session.username
    const userLevel = request.session.userLevel
    console.log(userLevel)
    response.render('index', {validUser, username, userLevel, chats})
})

app.post('/logOut',(request,response)=>{
    request.session.destroy()
    response.redirect('/')
})

app.post('/login', (request, response)=>{
    const {username, password} = request.body
    console.log(username + " " + password)
    let user = getUserFromUsernameAndPassword(username, password)
    if (user) {
        request.session.validUser = true
        request.session.username = user.username
        request.session.userLevel = user.userLevel
        request.session.userId = user.id
        console.log(user.userLevel)
    } else {
        request.session.validUser = false
    }
    console.log(request.session.validUser)
    response.redirect('/')
})

app.post('/chat/:id/sendMessage', (request, response) => {
    const id = parseInt(request.params.id)
    const chat = chats.find(chat => chat.id === id)
    const user = getUserFromId(request.session.userId)
    const msg = new Message(request.body.message, user, chat)
    chat.messagesHistory.push(msg)
    response.redirect(`/chat/${id}`)
})

app.post('/createUser',(request,response)=>{
    let temp = new User(request.body.username,request.body.password,new Date(),1)
    console.log(temp)
    users.push(temp)
    response.redirect('/')
})

app.post('/makeUser',(response)=>{
    response.render('makeUserPug')
})

app.post('/newChat', (request, response)=>{
    let user = getUserFromId(request.session.userId)
    let chat = new Chat(request.body.name, new Date, user)
    chats.push(chat)
    response.redirect('/')
})

app.get('/chat/:id', (request, response) => {
    if (request.session.validUser) {
        const id = parseInt(request.params.id)
        const chat = chats.find(chat=>chat.id == id)
        const user = users.find(u=>u.id === request.session.userId)
        console.log(user.id)
        response.render('chat', {chat,user})
    } else {
        response.render('/')
    }
})

app.delete('/chat/:id',(request,response)=>{
    console.log("we got here")
    const msgId = request.params.id
        chats.forEach(chat => {
        chat.messagesHistory = chat.messagesHistory.filter(
            msg => msg.id !== msgId
        );
    });
    response.render()
})


app.post('/return',(request,response)=>{
    response.redirect('/')
})

app.listen(8960, ()=>{console.log('Serveren kører på port 8960')})


function getUserFromUsernameAndPassword(username, password) {
    console.log(username, password)
    const user = users.find(user => user.username == username && user.password == password)
    if (user) {
        return user
    } else {
        return false
    }
}

function getUserFromId(id) {
    console.log(id)
    const user = users.find(user => user.id == id)
    if (user) {
        return user
    } else {
        return false
    }
}