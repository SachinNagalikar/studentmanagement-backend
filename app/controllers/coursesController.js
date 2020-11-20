const express = require('express')
const router = express.Router()
const { authorization } = require('../middlewares/authorization')
const { authenticateUser } = require('../middlewares/authenticate')
const { Course } = require('../models/course')

router.get('/',(req, res) => {
    Course.find()
        .then((course) => {
            res.send(course)
        })
        .catch((err) => {
        res.send(err)
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Course.findById(id)
        .then((course) => {
            if (course) {
                res.send(course)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
        res.send(err)
    })
})

router.post('/',authenticateUser,authorization, (req, res) => {
    const body = req.body
    const course = new Course(body)
    course.save()
        .then((course) => {
        res.send(course)
        })
        .catch((err) => {
        res.send(err)
    })
})

router.put('/:id',authenticateUser,authorization,(req, res) => {
    const id = req.params.id
    const course = req.body
    Course.findByIdAndUpdate(id, course, function (err, data) {
            if (err) {
                console.log(err)
            }

    })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.delete('/:id',authenticateUser,authorization, (req, res) => {
    const id = req.params.id
    Course.findByIdAndDelete(id)
        .then((course) => {
            if (course) {
                res.send(course)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})
module.exports = {
    coursesRouter:router
}