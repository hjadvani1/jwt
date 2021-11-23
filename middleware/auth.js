const jwt = require('jsonwebtoken');

const config = process.env;


const verifyToken = async (req,res,next)=>{
    const token = req.header('x-auth-token');

    if(!token)
    {
        return await res.status(403).send('You have to login first')
    }
    try {
        const decode = jwt.verify(token,config.TOKEN_KEY)
        req.user = decode;
    } catch (error) {
        return res.status(401).send('invalid token ')
    }
    return next()
}

module.exports = verifyToken;