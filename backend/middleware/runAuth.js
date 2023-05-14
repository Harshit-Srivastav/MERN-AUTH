import tokenAuth from "./authMiddleware.js"
const runAuth = async (req, res, next) => {
    try{
        const authRun = await tokenAuth.validateToken(req)
        if (authRun) {
            req.user = authRun.user
            req.token = authRun.token
            next()
        } else {
            return res.status(400).send({status: "failed", message: "Auth error"})
        }
    } catch(e) {
        return res.status(400).send({status: "failed", message: e.message})
    }
    
}

export default runAuth