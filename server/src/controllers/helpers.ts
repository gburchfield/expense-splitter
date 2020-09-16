import {DecodeAuthHeader, IsAuthenticated} from './types';

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
