import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        trim: true,
        required: true
    },
    email: {
        type: String, 
        trim: true,
        required: true,
        validate(value){
          return validator.isEmail(value)
        }
    },
    password: {
        type: String, 
        trim: true,
        required: true
    }
})

const User = mongoose.model('User', userSchema)

export default User