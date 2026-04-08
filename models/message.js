class Message{
    constructor(besked,user,chat){
        this.besked = besked
        this.user = user
        this.id = Message.id++
        this.chat = chat

    }
    static id = 1
}
export{Message}

