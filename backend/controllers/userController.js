import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import tokenAuth from '../middleware/authMiddleware.js'

class userController{
    static userRegistration = async (req, res) => {
        const {name, email, password, confirmPassword} = req.body
       
        try{
            
            const user = await User.findOne({email})
            if(user){
               return res.status(400).send({status: 'failed', message: 'Email already exists'})
            }
            if(name && email && password && confirmPassword){
               if(password === confirmPassword) {
                    var salt = await bcrypt.genSalt(10);
                    var hashedPassword = await bcrypt.hash(password, salt)
                    let user = await User.create({name,
                     email,
                     password: hashedPassword
                    })
                    user = await user.save()
                    const token = await tokenAuth.createToken(user._id)
                    return res.status(200).send({status: 'success', message: "User Registration Successfully", user, token})
               } else {
                    res.status(400).send({status: 'failed', message: `Password doesn't match`})
               }
            } else {
                return res.status(400).send({status: 'failed', message: 'All Fields are required'})
            }
        } catch(e){
            res.status(400).send({status: "failed", message: 'User Registration Failed'})
        }
    }

    static userLogin = async (req, res) => {
        const {email, password} = req.body
        try{
            if(email && password){
                const user = await User.findOne({email})
                if(!user){ return res.status(400).send({status: "failed", message: "User does not exists"})}
                if(user){
                    if(await bcrypt.compare(password, user.password)){
                        const token = await tokenAuth.createToken(user._id)
                        res.status(200).send({status: "success", user, token})
                    } else {
                        res.status(400).send({status: "failed", message: "Login Failed, Pls check your input again"})
                    }
                }
            } else {
                res.status(400).send({status: "failed", message: "All Fields are required"})
            }
        } catch(e){
            res.status(400).send({status: "failed", message: e.message})
        }
    }

    static getUser = async (req, res, next) => {
        try{
            res.status(200).send({user: req.user, token: req.token})
        } catch(e) {
            res.status(400).send({status: "failed", message: e.message})
        }
    }
    static getAllUser = async (req, res) => {
       try {
        const users =  await User.find({}).select('-password')
        res.status(200).send({status: "success", users})
       } catch (error) {
        res.status(400).send({status: "failed", message: e.message})
       } 
      }
      static changePassword = async (req, res) => {
        const {password, confirmPassword} = req.body
        try {
          if(password && confirmPassword && password === confirmPassword) {
              var salt = await bcrypt.genSalt(10)
              var hashedPassword = await bcrypt.hash(password, salt);
             const user = await User.findByIdAndUpdate(req.user._id, { $set: { password: hashedPassword }})
             return res.send({status: "success", user })
      
            } else {
              res.send({status: false, message: "All Fields are required with matched Password"})
            }
        } catch(e) {
          res.send({status: "failed", message: e.message})
        }
        
      }
}

export default userController