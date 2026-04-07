class User {
    constructor(username, password, dateCreation, userLevel) {
        this.username = username
        this.password = password
        this.dateCreation = dateCreation
        this.userLevel = userLevel
        this.id = id++
    }
    static id = 1
}

export {User}