import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
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
export default mongoose.model('User',userSchema)