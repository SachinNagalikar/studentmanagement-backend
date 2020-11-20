const mongoose = require('mongoose')
const { Schema } = mongoose
const courseSchema = new Schema({
    course_name: {
        type: String,
        required:true
    },
    course_dept: {
        type: String,
    },
    description: {
        type: String,
        required:true
    },
    course_room: {
        type: String,
        required:true
    },
    waitlist_capacity:{
        type:String
    },
    course_team:{
        type:String
    },
})
const Course = mongoose.model('Course', courseSchema)

module.exports = {
    Course
}