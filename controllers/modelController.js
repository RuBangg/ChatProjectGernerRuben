import Archive from "./archive.js"
import Chat from "../models/chat.js"
import User from "../models/user.js"
import Message from "../models/message.js"

let users = [new User('Gerner', '123', new Date(), 3), new User('Ruben','321',new Date(Date.now()),3)]
let chats = [new Chat('Gerners chatrum om chatrum', new Date(), users[0]), new Chat('Ruben chatter', new Date(), users[1])]
let allMessages = []

let usersData = await Archive.readFile('../data/users.json')
if (usersData) {
    users = JSON.parse(usersData)
    const biggestID = users.reduce((accumulator, user) => {
         return user.id >= accumulator ? user.id : accumulator
    },0)
    User.id = biggestID
}

let chatsData = await Archive.readFile('../data/chats.json')
if (chatsData) {
    chats = JSON.parse(chatsData)
    const biggestID = chats.reduce((accumulator, chat) => {
         return chat.id >= accumulator ? chat.id : accumulator
    },0)
    Chat.id = biggestID
}

let messagesData = await Archive.readFile('../data/messages.json')
if (messagesData) {
    allMessages = JSON.parse(messagesData)
    const biggestID = messages.reduce((accumulator, message) => {
         return message.id >= accumulator ? message.id : accumulator
    },0)
    Message.id = biggestID
}

async function addUser(username, password, dateCreation, userLevel) {
    const user = new User(username, password, dateCreation, userLevel)
    users.push(user)
    if (Archive.fileExists('../data/users.json')) {
        try {
            Archive.writeFile('../data/users.json', JSON.stringify(users))
        } catch (error) {
            console.log(error)
        }
    }
}

async function addChat(name, dateCreation, userOwner) {
    const chat = new Chat(name, dateCreation, userOwner)
    chats.push(chat)
    if (Archive.fileExists('../data/chats.json')) {
        try {
            Archive.writeFile('../data/chats.json', JSON.stringify(chats))
        } catch (error) {
            console.log(error)
        }
    }
}

async function addMessage(besked, user, chat) {
    const message = new Message(besked, user, chat)
    chat.messagesHistory.push(message)
    allMessages.push(message)
    if (Archive.fileExists('../data/messages.json')) {
        try {
            Archive.writeFile('../data/messages.json', JSON.stringify(allMessages))
        } catch (error) {
            console.log(error)
        }
    }
}

function getUsers() {
    return users
}

function getChats() {
    return chats
}

function getUserFromUsernameAndPassword(username, password) {
    const user = users.find(user => user.username == username && user.password == password)
    if (user) {
        return true
    } else {
        return false
    }
}

function getUserFromId(id) {
    return users.find(user => user.id == id)
}

function getChatFromId(id) {
    return chats.find(chat => chat.id == id)
}

function getUserLevelFromId(id) {
    let user = getUserFromId(id)
    return user.userLevel
}

export {addUser, addChat, addMessage, getUsers, getChats, getUserFromUsernameAndPassword, getChatFromId, getUserFromId, getUserLevelFromId}
