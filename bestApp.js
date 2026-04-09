import express from "express"
import session from "express-session"
import chatRouter from "./routes/chatRoutes.js"
import userRouter from "./routes/userRoutes.js"
import { getUserLevelFromId, getChats } from "./controllers/modelController.js"

const app = express.app()

app.set('view engine', 'pug')
app.use(express.static('assets'))
app.use(express.urlencoded())
app.use(session({
    secret: '0000101-22201-20201-sssssssssh-JEG-SOVER',
    saveUninitialized: true,
    resave: true
}))

app.get('/', (request, response)=>{
    const validUser = request.session.validUser
    const username = request.session.username
    const userLevel = getUserLevelFromId(request.session.userId)
    const chats = getChats()
    response.render('index', {validUser, username, userLevel, chats})
})

