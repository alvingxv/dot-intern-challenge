const Task = require('../models/task');

exports.getAllTask = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const tokenDecodablePart = token.split(".")[1];
    const decoded = Buffer.from(tokenDecodablePart, "base64").toString();
    var tokendata = JSON.parse(decoded);

    try {
        const tasks = await Task.find({
            owner: tokendata.user._id
        });
        return res.status(200).json({
            status: 200,
            data: tasks.map(task => {
                return {
                    id: task._id,
                    task: task.task,
                    description: task.description,
                    status: task.status
                }
            })
        });
    } catch (error) {
        return res.status(500).json(error);
    }
}
exports.getTaskById = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const tokenDecodablePart = token.split(".")[1];
    const decoded = Buffer.from(tokenDecodablePart, "base64").toString();
    var tokendata = JSON.parse(decoded);

    const { id } = req.params;

    try {
        const task = await Task.findOne({
            _id: id,
            owner: tokendata.user._id
        });
        return res.status(200).json({
            status: 200,
            data: {
                id: task._id,
                task: task.task,
                description: task.description,
                status: task.status
            }
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "Task not found"
        });
    }
}

exports.createTask = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const tokenDecodablePart = token.split(".")[1];
    const decoded = Buffer.from(tokenDecodablePart, "base64").toString();
    var tokendata = JSON.parse(decoded);


    const { task, description } = req.body;

    const newTask = new Task({
        task: task,
        description: description,
        owner: tokendata.user._id
    });

    try {
        await newTask.save();
        return res.status(201).json({
            status: 201,
            message: "Task Created"
        });
    } catch (error) {
        return res.status(500).json(error);
    }

}

exports.updateTaskStatus = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const tokenDecodablePart = token.split(".")[1];
    const decoded = Buffer.from(tokenDecodablePart, "base64").toString();
    var tokendata = JSON.parse(decoded);

    const { id } = req.params;

    try {
        const task = await Task.findOneAndUpdate({
            _id: id,
            owner: tokendata.user._id
        }, {
            status: true
        });
        return res.status(200).json({
            status: 200,
            message: "Task Updated"
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "Task not found"
        });
    }
}

exports.deleteTask = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const tokenDecodablePart = token.split(".")[1];
    const decoded = Buffer.from(tokenDecodablePart, "base64").toString();
    var tokendata = JSON.parse(decoded);

    const { id } = req.params;

    try {
        const task = await Task.findOneAndDelete({
            _id: id,
            owner: tokendata.user._id
        });
        return res.status(200).json({
            status: 200,
            message: "Task Deleted"
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "Task not found"
        });
    }
}
