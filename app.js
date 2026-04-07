import express, { request, response } from "express"
import session from "express-session"
const app = express()


app.set('view engine', 'pug')
app.use(express.static('assets'))
app.use(express.urlencoded())
app.use(session({
    secret: 'Blablablalala',
    saveUninitialized: true,
    resave: true
}))

app.get('/', (request, response)=>{
    response.render('index')
})

app.post('/login', (request, response)=>{
    
})

app.post('/login/newUser', (request, response)=>{
    
})

app.get('/login', (request, response)=>{
    
})