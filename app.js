const express = require('express');
const app = express()
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const {MOGOURI} = require('./config/keys')
app.use(express.json())

const authRoute = require('./routes/auth')


//RUetZw4UcF5x1klU
mongoose.connect(MOGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED..................")
})

app.use('/api',authRoute)

app.listen(PORT,()=>{
    console.log("server is running on PORT ",PORT)
})