import jwt from 'jsonwebtoken'
import dotenv from 'dotenv' 
import User from '../models/userModel.js'

dotenv.config()

class tokenAuth{
    static createToken = async (id) => {
        const token = await jwt.sign({userId: id}, process.env.SECRET_KEY, {expiresIn: '30d'})
        return token
        }
    static validateToken = async (req) => {
        try {
        const authHeaderValue = req.header('authorization');
        const token = authHeaderValue.split(' ')[1]
        const tokenObj = await jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findById(tokenObj.userId).select('-password')
        if(user) {
            return {user, token}
        } else {
            return false
        }
    }
        catch(e) {
            throw new Error('Auth Error')
        }

    }
}

export default tokenAuth