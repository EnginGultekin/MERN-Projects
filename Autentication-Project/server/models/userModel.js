import mongoose from "mongoose";
import validator from 'validator'

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        require: true,
        minlength: [4, "Fullname must be at least 4 characters"],
    },
    email: {
        type: String,
        require: true,
        validate:[validator.isEmail,"Email is not valid"]
    },
    password: {
        type: String,
        require: true,
        minlength: [12, "Email must be at least 8 characters"],
    },
    userType: {
        type: String,
        enum: ['USER', 'ADMIN', 'SUPERADMIN'],
        default: 'USER'
    },
    phoneNumber: {
        type: String,
        require: true
    },
})

// User adlı bir model oluşturduk ve buı model burdaki şemayı kullanacak
export default mongoose.model('User', userSchema)