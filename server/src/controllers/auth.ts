import {AuthController, DummyHandler} from './types';
import db from '../db';
import logger from '../utils/logger';
import {decodeAuthHeader} from './helpers';
import {User} from '../db/types';

const Signup: DummyHandler = (req, res) => {
  const {body} = req
  res.json({message: 'dummy success message', body})
}

const Login: DummyHandler = async (req, res) => {
  let user: User | null = null
  const DB = db.getConnection()
  const {headers} = req
  const {authorization} = headers
  if (!!authorization){
    const {username, password} = decodeAuthHeader(authorization as string)
    user = await DB.users.findOne({name: username})
  }
  if (!!user){
    res.writeHead(200, {'Set-Cookie': `token=${user.name}; Secure; HttpOnly; SameSite=Strict; Path=/;`}).end()
  } else {
    res.status(401).end()
  }
}

const authController: AuthController = {
  Signup,
  Login
}

export default authController
