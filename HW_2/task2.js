const express = require('express');
const app = express();
const userValidator = require('./userValidator.js');
const userRouter = express.Router();
const UserController = require('./UserController.js');
const controller = new UserController();

const PORT = 3000;
app.listen(PORT);

userRouter.get('/', (req, res, next) => {
    return controller.getAllUsers(req, res);
});

userRouter.post('/search', (req, res) => {
    console.log('search')
    return controller.search(req, res);
});

userRouter.get('/:id', (req, res, next) => {
   return controller.getUserById(req, res, next);
});

userRouter.post('/', userValidator.create, (req, res, next) => {
   return controller.createUser(req, res, next);
});

userRouter.put('/:id', userValidator.update, (req, res) => {
    return controller.updateUser(req, res);
});

userRouter.delete('/:id', (req, res, next) => {
    return controller.deleteUser(req, res, next);
});

userRouter.use((res, req, next) => {
    const error = new Error('No such page.');
    error.status = 404;
    res.next(error);
})

userRouter.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        res.status(400).json({
            type: err.type, // will be "query" here, but could be "headers", "body", or "params"
            message: err.error.details.map(error => error.message).join('/nn')
        });
    }
    res.status(err.status || 400).json({message: err.toString() || 'Unexpected error.'});
});

app.use('/users', userRouter);