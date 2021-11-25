import { Request, Response } from "express";
import User from "../models/User";
import { Iuser } from "../interface/user"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const register = async (req: Request, res: Response) => {

    try {
        const { first_name, last_name, email, password } = req.body;

        const bcryptpass = await bcrypt.hash(password, 10);
        // res.send('hello')
        const user: Iuser = await User.create(
            {
                first_name,
                last_name,
                email: email.toLowerCase(),
                password: bcryptpass,
            }
        );
        console.log(user);

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY || 'mykey',
            {
                expiresIn: '1h'
            }
        )
        res.json(token)
        res.status(201).json(user);

    } catch (error) {
        throw error;

    }


}
export const login = async (req: Request, res: Response) => {


    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY || 'mykey',
                {
                    expiresIn: '1h'
                }
            );

            user.token = token;

            res.status(200).json(user);
        }
        res.status(400).send('access denied')


    } catch (error) {
        throw error
    }
    res.send('hello')
}
export const profile = (req: Request, res: Response) => {

    res.send('hello')
}


