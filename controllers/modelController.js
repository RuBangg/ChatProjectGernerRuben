import Archive from "./archive.js"
import Chat from "../models/chat.js"
import User from "../models/user.js"
import Message from "../models/message.js"

let users = []
let chats = []
let allMessages = []

let usersData = await Archive.readFile('./data/users.json')
if (usersData) {
    users = JSON.parse(usersData)
    const biggestID = users.reduce((accumulator, user) => {
         return user.id >= accumulator ? user.id : accumulator
    },0)
    User.id = biggestID + 1
}

let chatsData = await Archive.readFile('./data/chats.json')
if (chatsData) {
    chats = JSON.parse(chatsData)
    const biggestID = chats.reduce((accumulator, chat) => {
         return chat.id >= accumulator ? chat.id : accumulator
    },0)
    Chat.id = biggestID + 1
}

let messagesData = await Archive.readFile('./data/messages.json')
if (messagesData) {
    allMessages = JSON.parse(messagesData)
    const biggestID = allMessages.reduce((accumulator, message) => {
         return message.id >= accumulator ? message.id : accumulator
    },0)
    Message.id = biggestID + 1
}

async function addUser(username, password, dateCreation, userLevel) {
    const user = await new User(username, password, dateCreation, userLevel)
    users.push(user)
    if (Archive.fileExists('./data/users.json')) {
        try {
            await Archive.writeFile('./data/users.json', JSON.stringify(users))
        } catch (error) {
            console.log(error)
        }
    }
}

async function addChat(name, dateCreation, userOwner) {
    const chat = await new Chat(name, dateCreation, userOwner)
    chats.push(chat)
    if (Archive.fileExists('./data/chats.json')) {
        try {
            await Archive.writeFile('./data/chats.json', JSON.stringify(chats))
        } catch (error) {
            console.log(error)
        }
    }
}

async function deleteChat(chatId) {
    const chat = getChatFromId(chatId)
    chats = chats.filter(c => c!== chat);
    console.log(chats)
    if (Archive.fileExists('./data/messages.json')) {
        try {
            await Archive.writeFile('./data/messages.json', JSON.stringify(allMessages))
        } catch (error) {
            console.log('FEJL')
            console.log(error)
        }
    }
}

async function addMessage(besked, user, chatId) {
    const message = await new Message(besked, user, chatId)
    const chat = getChatFromId(chatId)
    chat.messagesHistory.push(message)
    allMessages.push(message)
    console.log(message)
    if (Archive.fileExists('./data/messages.json')) {
        try {
            await Archive.writeFile('./data/messages.json', JSON.stringify(allMessages))
        } catch (error) {
            console.log('FEJL')
            console.log(error)
        }
    }
    if (Archive.fileExists('./data/chats.json')) {
        try {
            await Archive.writeFile('./data/chats.json', JSON.stringify(chats))
        } catch (error) {
            console.log(error)
        }
    }
}

async function deleteMessage(messageId) {
    // hente den chat den skal slættes fra og slætte den også slætte den fra alle og så write ny storeage fill
    const msg = getMessageFromId(messageId)
    const chat = getChatFromMessageId(messageId)
    chat.messagesHistory = chat.messagesHistory.filter(message => message.id != msg.id)
    allMessages = allMessages.filter(message =>message.id != msg.id)
        if (Archive.fileExists('./data/messages.json')) {
            console.log("tried to delete message")
        try {
            Archive.writeFile('./data/messages.json', JSON.stringify(allMessages))
        } catch (error) {
            console.log('FEJL')
            console.log(error)
        }
    }
    if (Archive.fileExists('./data/chats.json')) {
        try {
            Archive.writeFile('./data/chats.json', JSON.stringify(chats))
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
    return user
}

function getUserFromId(id) {
    return users.find(user => user.id == id)
}

function getUserMessagesFromUserId(userId) {
    let userMessages = []
    for (let message of allMessages) {
        if (message.user.id == userId) {
            userMessages.push(message)
        }
    }
    return userMessages
}

function getChatFromId(id) {
    return chats.find(chat => chat.id == id)
}

function getMessageFromId(id){
    return allMessages.find(msg => msg.id == id)
}

function getChatFromMessageId(id){
    return chats.find(chat =>
        chat.messagesHistory.some(msg => msg.id == id)
    )
}

function getChatFromChatName(name){
    console.log("testDeleteChat3")
const x = chats.find(chat => {
    return chat.name == name;
});
    console.log(x)
    return x
}

function getUserLevelFromId(id) {
    let user = getUserFromId(id)
    return user.userLevel
}

export {addUser, addChat, deleteChat, getChatFromChatName, addMessage, deleteMessage, getUsers, getChats, getUserFromUsernameAndPassword, getChatFromId, getUserFromId, getUserLevelFromId, getMessageFromId, getUserMessagesFromUserId}
