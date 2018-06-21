const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'User1',
            room: 'Room 1'
        }, {
            id: '2',
            name: 'User2',
            room: 'Room 2'
        }, {
            id: '3',
            name: 'User3',
            room: 'Room 1'
        }]
    });

    it('should add a new user', () => {
        const users = new Users();
        const user = {
            id: 'userId',
            name: 'userName',
            room: 'userRoom'
        };
        const returnedUser = users.addUser(user.id, user.name, user.room);
        expect(users.users.length).toBe(1);
        expect(users.users[0]).toEqual(returnedUser);
        expect(returnedUser).toEqual(user);
    });

    it('should delete user with id 2', () => {
        const removedUser = users.removeUser('2');
        expect(users.users.length).toBe(2);
        expect(removedUser).toEqual({
            id: '2',
            name: 'User2',
            room: 'Room 2'
        });
    });

    it('should delete user with id 50', () => {
        const removedUser = users.removeUser('50');
        expect(users.users.length).toBe(3);
        expect(removedUser).toBe(undefined);
    });

    it('should find user with id 3', () => {
        const user = users.getUser('3');
        expect(users.users.length).toBe(3);
        expect(user).toBe(users.users[2]);
    });

    it('should not find user with id 50', () => {
        const user = users.getUser('50');
        expect(users.users.length).toBe(3);
        expect(user).toBe(undefined);
    });


    it('should return the list of users in room 1', () => {
        const returnedUsers = users.getUserList('Room 1');
        expect(returnedUsers.length).toBe(2);
        expect(returnedUsers[0]).toBe('User1');
        expect(returnedUsers[1]).toBe('User3');
    });
});