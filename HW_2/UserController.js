class UserController {
    constructor() {
        this.users = [
            {
                id: '1',
                login: 'login',
                password: '123',
                age: 15,
                isDeleted: false
            },
            {
                id: '2',
                login: 'abc',
                password: '123',
                age: 23,
                isDeleted: false
            },
            {
                id: '3',
                login: 'john',
                password: '123',
                age: 33,
                isDeleted: false
            }
        ];
    }

    getAllUsers(req, res) {
      res.send(this.users);
    }

    getUserById (req, res, next) {
        const {id} = req.params;
        const user = this.users.find(user => user.id === id);

        if (user) {
            res.send(user);
        }
        const error = new Error('No user with such id.');
        error.status = 400;
        next(error);
    }

    deleteUser(req, res, next) {
        const {id} = req.params;
        const user = this.users.find(user => user.id === id);

        if (user) {
            user.isDeleted = true;
            next();
        }
        const error = new Error('No user with such id.');
        error.status = 400;
        next(error);
    }

    updateUser(req, res) {
        const {id} = req.params;
        const user = this.users.find(user => user.id === id);
        const newUser = {...user, ...req.body};
        res.send(newUser);
    }

    createUser(req, res, next) {
        const {user} = req.body;
        const newUser = {...user, isDeleted: false, id: this.users.length};
        this.users.push(newUser);
        res.send(newUser);
    }

    search(req, res) {
        const {loginSubstring, limit} = req.body;
        res.send(getAutoSuggestUsers(loginSubstring, limit, this.users));
    }
}
function getAutoSuggestUsers(loginSubstring, limit, users) {
    const filteredUsers = users.filter(({login}) => login.toLowerCase().includes(loginSubstring.toLowerCase()));
    return sortObjectsByKey(filteredUsers, 'login').splice(0, limit);
}

function sortObjectsByKey(key, array) {
    return array.sort((a, b) => a[key] > b[key] ? 1 : -1);
}

module.exports = UserController;