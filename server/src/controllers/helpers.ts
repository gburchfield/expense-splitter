import {AddExpenseToTrip, AuthorizedForTrip, DecodeAuthHeader, IsAuthenticated} from './types';
import {CreateTripDoc, Expense} from '../db/types';
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

export const authorizedForTrip: AuthorizedForTrip = (name, trip) => {
  let isAuthorized = false
  const {members} = trip
  members.forEach(x => isAuthorized = isAuthorized || x.name === name)
  return isAuthorized
}

export const addExpenseToTrip: AddExpenseToTrip = (name, amount, trip) => {
  const expense: Expense = {
    _id: v4(),
    amount: (Math.round(amount * 100) / 100).toFixed(2).toString()
  }
  trip.members.forEach((x, i) => {
    if (x.name === name){
      x.expenses.push(expense)
      trip.members[i] = x
    }
  })
  return [trip, expense._id]
}
