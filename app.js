const express = require('express');
const app = express()

const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const { MONGOURI } = require('./config/keys')

const authRoute = require('./routes/auth')
const todoRoute = require('./routes/todo')
const userRoute = require('./routes/user')


//RUetZw4UcF5x1klU
mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED..................")
})

app.use(express.json())

app.use('/api', authRoute)
app.use('/api', todoRoute)
app.use('/api', userRoute)

app.listen(PORT, () => {
    console.log("server is running on PORT ", PORT)
})