class Message{
    constructor(besked,User,Chat){
        this.besked = besked
        this.User = User
        this.id = Message.id++
        this.Chat = Chat

    }
    static id = 1
}
export{Message}