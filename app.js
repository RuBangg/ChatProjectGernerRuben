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

let users = [new User('Gerner', '123', new Date(), 3)]
console.log(users)

app.get('/', (request, response)=>{
    response.render('index')
})

app.post('/login', (request, response)=>{
    const {username, password} = request.body
    console.log(username + " " + password)
    request.session.validUser = checkUser(username, password)
    console.log(request.session.validUser)
    response.redirect('/')
})

app.post('/login/newUser', (request, response)=>{
    
})

app.get('/login', (request, response)=>{
    
})


app.listen(8960, ()=>{console.log('Serveren kører på port 8960')})


function checkUser(username, password) {
    console.log(username, password)
    const user = users.find(user => user.username == username && user.password == password)
    if (user) {
        return true
    } else {
        return false
    }
}