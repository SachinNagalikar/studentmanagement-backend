const mongoose = require('mongoose')
const { Schema } = mongoose
const profileSchema = new Schema({
  
    name: {
        type: String,
        required:true
    },
    email: { 
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value)
            },
            message: function () {
                return "invalid email id and password"
            }
        }
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    phone_number: { 
        type: Number,
        minlength: 10,
        maxlength:10,
       required:true
    },
    about_me: {
        type: String,
    },
    city: {
        type: String,
        required:true
    },
    country: {
        type: String,
        required:true
    },
    company:{
        type:String
    },
    school:{
        type:String
    },
    hometown:{
        type:String
    },
    languages:{
        type:String
    },
    gender:{
        type:String
    },
    profileImage: {
        type:String
    }
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports={
Profile
}