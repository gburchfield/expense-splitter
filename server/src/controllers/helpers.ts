import {DecodeAuthHeader} from './types';

export const decodeAuthHeader: DecodeAuthHeader = (header) => {
  let username: string
  let password: string
  const decoded: string = Buffer.from(header.split(' ')[1], 'base64').toString() as string
  [username, password] = decoded.split(':')
  return {username, password}
}
