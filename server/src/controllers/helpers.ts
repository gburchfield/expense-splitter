import {AddExpenseToTrip, AddMemberToTrip, AuthorizedForTrip, DecodeAuthHeader, IsAuthenticated} from './types';
import {CreateTripDoc, CreateTripMemberDoc, Expense, Transaction, Trip, TripMember} from '../db/types';
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
    members: [createTripMemberDoc(memberName)],
    total_expense: '0',
  }
}

const createTripMemberDoc: CreateTripMemberDoc = (name) => {
  return {
    name: name.toLowerCase(),
    expenses: [],
    total_expense: '0',
    transactions: [],
    complete: false
  }
}

export const authorizedForTrip: AuthorizedForTrip = (name, trip) => {
  name = name.toLowerCase()
  let isAuthorized = false
  const {members} = trip
  members.forEach(x => isAuthorized = isAuthorized || x.name === name)
  return isAuthorized
}

export const addExpenseToTrip: AddExpenseToTrip = (name, amount, trip) => {
  name = name.toLowerCase()
  const expense: Expense = {
    _id: v4(),
    amount: toCurrency(amount)
  }
  trip.members.forEach((x, i) => {
    if (x.name === name){
      x.expenses.push(expense)
      trip.total_expense = sumExpenses(trip.total_expense, expense.amount)
      let memberTotalExpense = '0'
      x.expenses.forEach(j => {
        memberTotalExpense = sumExpenses(memberTotalExpense, j.amount)
      })
      x.total_expense = memberTotalExpense
      trip.members[i] = x
    }
  })
  trip = updateTransactions(trip)
  return [trip, expense._id]
}

export const addMemberToTrip: AddMemberToTrip = (name, trip) => {
  let alreadyOnTrip = false
  trip.members.forEach(x => alreadyOnTrip = alreadyOnTrip || x.name === name)
  if (!alreadyOnTrip){
    const member: TripMember = createTripMemberDoc(name)
    trip.members.push(member)
    trip = updateTransactions(trip)
  }
  return trip
}

const toCurrency: (amount: string | number) => string = amount => {
  let num: number
  if (typeof amount === 'string'){
    num = parseFloat(amount)
  } else {
    num = amount
  }
  return (Math.round(num * 100) / 100).toFixed(2)
}

const sumExpenses: (total: string, amount: string) => string = (total, amount) => {
  const result = parseFloat(toCurrency(total)) + parseFloat(toCurrency(amount))
  return toCurrency(result)
}

const updateTransactions: (trip: Trip) => Trip = (trip) => {
  const {total_expense} = trip
  const totalMembers = trip.members.length
  const fairShare = toCurrency(parseFloat(total_expense) / totalMembers)
  const needsFunds: {[key: string]: number}[] = []
  const owesFunds: [TripMember, number, number][] = []
  trip.members.forEach((x, i) => {
    x.transactions = []
    const diff = parseFloat(fairShare) - parseFloat(x.total_expense)
    if (diff < 0){
      needsFunds.push({[x.name]: diff * -1})
    } else {
      owesFunds.push([x, diff, i])
    }
  })
  needsFunds.sort((a, b) => {
    const A = a[Object.keys(a)[0]]
    const B = b[Object.keys(b)[0]]
    return B - A
  })
  owesFunds.sort((a, b) => {
    const A = a[1]
    const B = b[1]
    return B - A
  })
  let currentMember: {[key: string]: number} | undefined = needsFunds.shift()
  const handleOwesFunds: (x: [TripMember, number, number]) => void = x => {
    console.log(`handleOwesFunds`, `\ncurrentMember = `, currentMember, `\nx = `, x, `\nneedsFunds = `, needsFunds)
    if (currentMember){
      let member: TripMember = x[0]
      const amountOwed = x[1]
      const index = x[2]
      const currentMemberName = Object.keys(currentMember)[0]
      const amountDue = currentMember[currentMemberName]
      const diff = amountDue - amountOwed
      if (diff >= 0){
        member = addTransaction(member, currentMemberName, amountOwed)
        trip.members[index] = member
        currentMember[currentMemberName] = diff
      } else {
        member = addTransaction(member, currentMemberName, amountDue)
        currentMember = needsFunds.shift()
        const stillOwe = diff * -1
        handleOwesFunds([member, stillOwe, index])
      }
    }
  }
  owesFunds.forEach(handleOwesFunds)
  return trip
}

const addTransaction: (member: TripMember, to: string, amountOwed: number) => TripMember = (member, to, amountOwed) => {
  const transaction: Transaction = {
    to,
    amount: toCurrency(amountOwed)
  }
  member.transactions = member.transactions.concat(transaction)
  return member
}


