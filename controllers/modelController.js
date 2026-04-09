import Archive from "./archive.js"
import Chat from "../models/chat.js"
import User from "../models/user.js"
import Message from "../models/message.js"

let users = [new User('Gerner', '123', new Date(), 3), new User('Ruben','321',new Date(Date.now()),3)]
let chats = [new Chat('Gerners chatrum om chatrum', new Date(), users[0]), new Chat('Ruben chatter', new Date(), users[1])]

let usersData = await Archive.readFile('./data/users.json')
if (usersData) {
    users = JSON.parse(usersData)
    const biggestID = users.reduce((accumulator, user) => {
         return user.id >= accumulator ? user.id : accumulator
    },0)
    User.id = biggestID
}

let chatsData = await Archive.readFile('./data/chats.json')
if (chatsData) {
    chats = JSON.parse(chatsData)
    const biggestID = chats.reduce((accumulator, chat) => {
         return chat.id >= accumulator ? chat.id : accumulator
    },0)
    Chat.id = biggestID
}

//TODO fjern og kan tilføje ordentligt
chats[0].messagesHistory[0] = new Message('sikke flot vjer vi har',users[0],chats[0])
chats[0].messagesHistory[1] = new Message('du har vist ikke kigget ud af vinduet',users[1],chats[0])
chats[0].messagesHistory[2] = new Message('jeg elsker rengvjer',users[0],chats[0])
chats[0].messagesHistory[3] = new Message('suk',users[1],chats[0])

async function addUser(username, password, dateCreation, userLevel) {
    const user = new User(username, password, dateCreation, userLevel)
    users.push(user)
    if (Archive.fileExists('./data/users.json')) {
        try {
            Archive.writeFile('./data/users.json', JSON.stringify(users))
        } catch (error) {
            console.log(error)
        }
    }
}

async function addChat(name, dateCreation, userOwner) {
    const chat = new Chat(name, dateCreation, userOwner)
    chats.push(chat)
    if (Archive.fileExists('./data/chats.json')) {
        try {
            Archive.writeFile('./data/chats.json', JSON.stringify(chats))
        } catch (error) {
            console.log(error)
        }
    }
}

async function addMessage(besked, user, chat) {
    const message = new Message(besked, user, chat)
    chat.messagesHistory.push(message)
    //write to file
}

function getUsers() {
    return users
}

function getchats() {
    return chats
}


