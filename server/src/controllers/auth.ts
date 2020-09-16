import {AuthController, DummyHandler} from './types';
import db from '../db';
import logger from '../utils/logger';

const Signup: DummyHandler = (req, res) => {
  const {body} = req
  res.json({message: 'dummy success message', body})
}

const Login: DummyHandler = async (req, res) => {
  const DB = db.getConnection()
  const user = await DB.users.find('Glen')
  logger.log(user)
  const {headers} = req
  res.json({message: 'dummy success message', headers, user})
}

const authController: AuthController = {
  Signup,
  Login
}

export default authController
