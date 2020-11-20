const express = require('express')
const router = express.Router()
const { Profile } = require('../models/profile')
const multer = require('multer')
const { authorization } = require('../middlewares/authorization')
const { authenticateUser } = require('../middlewares/authenticate')
const path=require('path')
const storage= multer.diskStorage(
    {
        destination: "./upload/",
        filename: function (req, file,cb) {
    cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname.toLowerCase()))
        }
    })
const upload = multer({
    storage:storage
})


router.get('/',(req,res)=>{

    Profile.find()
        .then((Profile) => {
          console.log('welcome to profile')
        res.send(profile) 
        })
        .catch((err) => {
        res.send(err)
    })
})

router.get('/:name', (req, res) => {
    const name=req.params.name
    Profile.find(name)
        .then((profile) => {
        res.send(profile)
        })
        .catch((err) => {
        res.send(err)
    })
})

router.get('/:id', (req, res) => {
    const id=req.params.id
    Profile.findById(id)
        .then((profile) => {
        res.send(profile)
        })
        .catch((err) => {
        res.send(err)
    })
})



router.put('/:id',authenticateUser,authorization,(req, res) => {
    const profile = req.body
    const id= req.params.id
    Profile.findByIdAndUpdate(id, profile, function (err, data) {
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

router.post('/add',upload.single("profileImg"), (req, res) => {
    console.log(req,'file')
    const body = req.body
    // const filedest = req.file.destination
    // let imgURL = filedest.slice(1) + req.file.filename
    // body.imgURL = imgURL
    console.log(req.file)
    const profile = new Profile(body)
    console.log(profile)
    profile.save()
    .then((profile)=>{  
        res.send({
            profile,
            notice: 'successfully added'
        })
    })
    .catch((err) => {
    res.send(err)
})
})

router.delete('/:id',authenticateUser,authorization,  (req, res) => {
    const id = req.params.id
    Profile.findByIdAndDelete(id)
        .then((profile) => {
            if (profile) {
                res.send(profile)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
    profilesRouter:router
}