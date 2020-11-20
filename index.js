const express = require('express')
//const mongoose = require('./config/database')
const{mongoose} = require('./config/database'); // object destructuring es6
var cors = require('cors')
const port=5000
const { usersRouter } = require('./app/controllers/usersController')
const { coursesRouter } = require('./app/controllers/coursesController')
const {profilesRouter}=require('./app/controllers/ProfilesController')
const app = express()
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Welcome to the  site')
})
app.use('/profiles',profilesRouter)
app.use('/users',usersRouter)
app.use('/courses',coursesRouter)
app.use('/upload',express.static('upload'))
app.listen(port, function(){
    console.log('listening on port', port);
});

