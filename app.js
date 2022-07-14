const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')

const { router } = require('./routes/index')
const { userRouter } = require('./routes/user')
const { verifyToken } = require("./middlewares/auth")

const app = express()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to mongodb');
    }).catch(err => {
        console.log(err);
    });

//bodyparser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());



const PORT = process.env.PORT || 3000

app.use('/', router)
app.use('/task', verifyToken, userRouter)

app.listen(PORT, () => {
    console.log(`server is listening  on  http://localhost:${PORT}`);
})