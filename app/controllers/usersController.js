const express = require('express')
const router= express.Router()
const { User } = require('../models/user')
const { authenticateUser } = require('../middlewares/authenticate')


router.post('/signup', (req, res) => {
    console.log("hello", req)
    const body = req.body
    const user = new User(body)
    console.log(res,"data of user")
    user.save()
        .then((user) => {
            console.log('here',user)
            res.send({
                user,
                notice: 'successfully registerd'
            })
        })
        .catch((err) => {
        res.send(err)
    })
})

router.get('/', (req, res) => {
User.find()
.then((user) => {
    res.send(user)
})
    .catch((err) => {
        res.send(err)
    })
})




router.get('/:id', authenticateUser, (req, res) => {
    const id = req.params.id
    User.findById(id)
        .then((user) => {
            if (user) {
                res.send(user)
            } else { 
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})




router.delete('/:id', authenticateUser, (req, res) => {
    const id = req.params.id
    User.findByIdAndDelete({
        _id: id,
        user:req.user._id
    })
        .then((user) => {
            if (user) {
                res.send(user)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})


router.post('/login', (req, res) => {

    const body = req.body

    User.findByEmailAndPassword(body.email, body.password)
        .then((user) => { 
            console.log(user,"user 81")
            return user.generateToken()
        })
        .then((token) => {
            console.log(token,'i am here in token')
            res.send(user,token)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.delete('/logout', authenticateUser, (req, res) => {

    User.findOne({
            _id: req.user._id
        })
        .then((user) => {

            // res.send(user)
            console.log(user.tokens);
            console.log(req.token);
            user.tokens = user.tokens.filter(tokenItem => tokenItem.token != req.token)
            user.save()
                .then((user) => {
                    res.send({
                        user,
                        notice: "successfully logged out"
                    })
                })
                .catch(err => res.send(err))
        })

        .catch((err) => {
            res.send(err) 
        })
})
router.delete('/logoutall', authenticateUser, (req, res) => {
    User.findOne({
            _id: req.user._id
        })
        .then((user) => {
           
            user.tokens = [] 
            user.save()
                .then((user) => {
                    res.send({
                        user,
                        notice: "successfully logged out"
                    })
                })
                .catch(err => res.send(err))
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
    usersRouter: router
}