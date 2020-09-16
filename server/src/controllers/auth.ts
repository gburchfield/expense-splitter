import {AuthController, DummyHandler} from './types';
import db from '../db';
import logger from '../utils/logger';
import {decodeAuthHeader} from './helpers';
import {User} from '../db/types';

const Signup: DummyHandler = async (req, res) => {
  let success = false
  let exceptionMessage: {message: string} | null = null
  const {body: user} = req
  const DB = db.getConnection()
  if (user && user.name){
    const alreadyExists = await DB.users.findOne({name: user.name})
    if (!!alreadyExists){
      exceptionMessage = {message: `user already exists.`}
    } else {
      success = await DB.users.insertOne({name: user.name})
    }
  } else {
    exceptionMessage = {message: `'name' not provided.`}
  }
  if (success){
    res.status(200).json({message: `Signup successful. Please Login.`})
  } else {
    if (!exceptionMessage){
      res.status(500).json({message: `Could not save to database. Try again later.`})
    } else {
      res.status(400).json(exceptionMessage)
    }
  }
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
