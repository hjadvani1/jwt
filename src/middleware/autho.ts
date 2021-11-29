import { SrvRecord } from "dns";
import { Request, NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IPayload } from "../interface/payload";


const verifyToken = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('x-auth-token');

    if (!token) {
        return await res.status(403).send('You have to login first')
    }
    try {
        const decode = jwt.verify(token, process.env.TOKEN_KEY || 'mykey') as IPayload;

        req.user = decode
        // console.log(req.user);

        // req.userId = decode._id
        // console.log(decode);
        // console.log(decode.user_id);

        next();
    } catch (error) {
        return res.status(401).send('invalid token ')
    }
}

export default verifyToken;