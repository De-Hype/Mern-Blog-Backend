const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose') ;
const UserRoute = require('./Routes/UserRoutes');
const BlogRoute = require('./Routes/BlogRoutes');
const dotenv = require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

//MongoDb Database Connection
async function connect(){
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('Connected To Database')
    } catch (error) {
        console.error(error)
    }
}

connect()



app.use('/api/user', UserRoute )
app.use('/api/blog', BlogRoute)

const Port = process.env.Port || 8080

app.listen(Port, ()=>{
    console.log(`Server listening on Port ${Port}`)
})
