import express from "express"
import session from "express-session"
import chatRouter from "./routes/chatRoutes.js"
import userRouter from "./routes/userRoutes.js"
import { getUserLevelFromId, getChats, getUserFromId } from "./controllers/modelController.js"

const app = express()

app.set('view engine', 'pug')
app.use(express.static('assets'))
app.use(express.static('public'))
app.use(express.urlencoded())
app.use(session({
    secret: '01-20201-sssssssssh-JEG-SOVER',
    saveUninitialized: true,
    resave: true
}))

app.get('/', (request, response)=>{
    const validUser = request.session.validUser
    const username = request.session.username
    const userLevel = request.session.userLevel
    const chats = getChats()
    response.render('index', {validUser, username, userLevel, chats})
})

app.use('/chats', chatRouter)
app.use('/users', userRouter)

app.use((request, response, next)=>{
    response.render('404', {})
})

app.listen(8960, ()=>{console.log('Serveren kører på port 8960')})