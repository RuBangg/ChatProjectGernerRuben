import express, { request, response } from "express"
import session from "express-session"
import { User } from "./models/user.js"
import { Chat } from "./models/chat.js"
import { Message } from "./models/message.js"
const app = express()

 
app.set('view engine', 'pug')
app.use(express.static('assets'))
app.use(express.urlencoded())
app.use(session({
    secret: 'Blablablalala',
    saveUninitialized: true,
    resave: true
}))

let users = [new User('Gerner', '123', new Date(), 3),new User('Ruben','321',new Date(Date.now()),3)]
console.log(users)

app.get('/', (request, response)=>{
    const validUser = request.session.validUser
    const username = request.session.username
    response.render('index', {validUser, username})
})

app.post('/login', (request, response)=>{
    const {username, password} = request.body
    console.log(username + " " + password)
    let user = getUserFromUsernameAndPassword(username, password)
    if (user) {
        request.session.validUser = true
        request.session.username = user.username
    } else {
        request.session.validUser = false
    }
    console.log(request.session.validUser)
    response.redirect('/')
})

app.post('/createUser',(request,response)=>{
    let temp = new User(request.body.username,request.body.password,new Date(),1)
    console.log(temp)
    users.push(temp)
    response.redirect('/')
})

app.post('/makeUser',(request,response)=>{
    response.render('makeUserPug')
})

app.post('/return',(request,response)=>{
    response.redirect('/')
})

app.listen(8960, ()=>{console.log('Serveren kører på port 8960')})


function getUserFromUsernameAndPassword(username, password) {
    console.log(username, password)
    const user = users.find(user => user.username == username && user.password == password)
    if (user) {
        return true
    } else {
        return false
    }
}