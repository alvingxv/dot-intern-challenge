const jsonwebtoken = require("jsonwebtoken");
const User = require('../models/user');
const { hashSync, genSaltSync, compareSync } = require("bcrypt");

exports.register = async (req, res, next) => {
    try {
        const { name } = req.body;
        let { password } = req.body;


        if (!name || !password) {
            return res.sendStatus(400);
        }

        const userExist = await User.findOne({
            name: name
        });

        if (userExist) {
            return res.status(409).json({
                status: 409,
                message: "name has been taken",
            });
        }

        const salt = genSaltSync(10);
        password = hashSync(password, salt);

        const user = new User({
            name: name,
            password: password,
        });

        try {
            await user.save();
            return res.status(201).json({
                status: 201,
                message: "User Created"
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { name } = req.body;
        let { password } = req.body;

        const user = await User.findOne({
            name: name
        });

        if (!user) {
            return res.status(401).json({
                status: 401,
                message: "Invalid name or password"
            });
        }

        const isValidPassword = compareSync(password, user.password);
        if (isValidPassword) {
            user.password = undefined;
            const jsontoken = jsonwebtoken.sign({
                user: user,
            },
                process.env.SECRET_KEY, {
                expiresIn: "30m",
            });

            res.status(200).json({
                status: 200,
                token: jsontoken
            });
        } else {
            return res.status(401).json({
                status: 401,
                message: "Invalid number or password"
            });
        }
    } catch (e) {
        console.log(e);
    }
};