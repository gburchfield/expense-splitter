import {DecodeAuthHeader, IsAuthenticated} from './types';
import {CreateTripDoc} from '../db/types';
import {v4} from 'uuid';

export const decodeAuthHeader: DecodeAuthHeader = (header) => {
  let username: string
  let password: string
  const decoded: string = Buffer.from(header.split(' ')[1], 'base64').toString() as string
  [username, password] = decoded.split(':')
  return {username, password}
}

export const isAuthenticated: IsAuthenticated = (req, res, next) => {
  if (req.cookies && req.cookies.token){
    const {token} = req.cookies
    // @ts-ignore
    req.name = token as string
    next()
  } else {
    res.status(401).json({message: 'Not Authenticated'})
  }
}

export const createTripDoc: CreateTripDoc = (tripName, memberName) => {
  return {
    _id: v4(),
    name: tripName,
    members: [
      {
        name: memberName,
        expenses: []
      }
    ]
  }
}
