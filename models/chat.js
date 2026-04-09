class Chat {
    constructor(name, dateCreation, userOwner) {
        this.name = name
        this.dateCreation = dateCreation
        this.userOwner = userOwner
        this.id = Chat.id++
        this.messagesHistory = []
    }

    static id = 1
}
export default Chat