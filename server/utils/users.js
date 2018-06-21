class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        const user = { id, name, room };
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        const index = this.users.findIndex((user) => user.id === id);
        if (index >= 0) {
            return this.users.splice(index, 1)[0]
        }
        return undefined;
    }

    getUser(id) {
        return this.users.find((user) => user.id === id);
    }

    getUserList(room) {
        return this.users.filter((user) => user.room === room)
            .map((user) => user.name);
    }
}

module.exports = { Users };