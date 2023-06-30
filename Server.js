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

mongoose.connect(
    'mongodb+srv://Blog:3jkzs43KSTGqefRP@cluster0.1wmzudx.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, res) {
        try {
            console.log('Connected to Database');
        } catch (err) {
            throw err;
        }
    }); 

connect()



app.use('/api/user', UserRoute )
app.use('/api/blog', BlogRoute)

const Port = process.env.Port || 8080

app.listen(Port, ()=>{
    console.log(`Server listening on Port ${Port}`)
})
