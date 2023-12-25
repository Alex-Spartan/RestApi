import express from 'express';

import { getUserByEmail, createUser, } from '../db/users';
import { random , authentication} from '../helpers/helper';

export const register = async (req: express.Request, res: express.Response) => {
    try {
        console.log('Received API request:', req.method, req.url);
        const {  email, name, password} = req.body;
        console.log('Request body:', req.body);

        if ( !email || !password || !name) {
            console.log('Fields missing')
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);
        console.log('Existing User', existingUser);

        if (existingUser){
            console.log('User with the same email already exists');
            return res.status(400)
        }

        const salt = random();
        try {
            const user = await createUser({
              email,
              name,
              authentication: {
                salt,
                password: authentication(salt, password),
              },
            });

            console.log('User Created!')
            
            return res.status(200).json(user).end();
          } catch (error) {
            console.error('An error occurred during API request:', error);
            return res.status(500).json({error: 'Internal server error'}).end()
          }
    } catch (error) {
        console.log('Error occured in request', error);
        return res.sendStatus(400);
    }
}