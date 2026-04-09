class Message{
    constructor(besked,user,chatId){
        this.besked = besked
        this.user = user
        this.id = Message.id++
        this.chatId = chatId
    }
    static id = 1
}

export default Message

