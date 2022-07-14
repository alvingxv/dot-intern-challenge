const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/user');

userRouter.get('/', userController.getAllTask);
userRouter.get('/:id', userController.getTaskById);
userRouter.post('/', userController.createTask);
userRouter.put('/:id', userController.updateTaskStatus);
userRouter.delete('/:id', userController.deleteTask);


module.exports = { userRouter };