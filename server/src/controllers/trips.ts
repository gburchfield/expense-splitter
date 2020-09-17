import {AuthenticatedReq, TripsController} from './types';
import {addExpenseToTrip, addMemberToTrip, authorizedForTrip, createTripDoc} from './helpers';
import db from '../db';
import {CollectionWrapper, RequireKeys, Trip} from '../db/types';
import {RequestHandler} from 'express';

const CreateTrip: RequestHandler = async (req, res) => {
  const {name: memberName, body} = req as AuthenticatedReq
  const {name: tripName} = body
  if (tripName){
    const tripDoc = createTripDoc(tripName, memberName)
    const DB = db.getConnection()
    const result = await DB.trips.insertOne(tripDoc)
    if (result && result.insertedId){
      res.status(200).json({tripId: result.insertedId})
    } else {
      res.status(500).json({message: `Could not save to database. Try again later.`})
    }
  } else {
    res.status(400).json({message: `'name' not provided.`})
  }
}

const GetAllUserTrips: RequestHandler = async (req, res) => {
  const {name} = req as AuthenticatedReq
  const DB = db.getConnection()
  const trips = await (DB.trips as RequireKeys<CollectionWrapper<Trip>, 'find'>).find({name})
  res.status(200).json(trips)
}

const GetTrip: RequestHandler = async (req, res) => {
  const {name, params} = req as AuthenticatedReq
  const {trip_id} = params
  const query = {_id: trip_id}
  const DB = db.getConnection()
  const trip = await DB.trips.findOne(query)
  if (trip && authorizedForTrip(name, trip)){
    res.status(200).json(trip)
  } else {
    res.status(404).end()
  }
}

const UpdateTrip: RequestHandler = (req, res) => {
  res.json({message: 'dummy success message'})
}

const AddExpense: RequestHandler = async (req, res) => {
  const {name, params, body} = req as AuthenticatedReq
  const {trip_id} = params
  const query = {_id: trip_id}
  const {amount} = body
  if (amount || !isNaN(parseFloat(amount))){
    const DB = db.getConnection()
    const trip = await DB.trips.findOne(query)
    if (trip && authorizedForTrip(name, trip)){
      const [updatedTrip, expenseId] = addExpenseToTrip(name, amount, trip)
      const result = await (DB.trips as RequireKeys<CollectionWrapper<Trip>, 'updateOne'>).updateOne(query, updatedTrip)
      if (result){
        res.status(200).json({expenseId})
      } else {
        res.status(500).end()
      }
    } else {
      res.status(401).end()
    }
  } else {
    res.status(400).json({message: `'amount' not provided or not correct type/format.`})
  }
}

const RemoveExpense: RequestHandler = (req, res) => {
  res.json({message: 'dummy success message'})
}

const AddMember: RequestHandler = async (req, res) => {
  const {name, params, body} = req as AuthenticatedReq
  const {trip_id} = params
  const tripQuery = {_id: trip_id}
  const {name: memberName} = body
  const memberQuery = {name: memberName}
  if (memberName){
    const DB = db.getConnection()
    const member = await DB.users.findOne(memberQuery)
    if (member){
      const trip = await DB.trips.findOne(tripQuery)
      if (trip && authorizedForTrip(name, trip)){
        const updatedTrip = addMemberToTrip(memberName, trip)
        const result = await (DB.trips as RequireKeys<CollectionWrapper<Trip>, 'updateOne'>).updateOne(tripQuery, updatedTrip)
        if (result){
          res.status(200).end()
        } else {
          res.status(500).end()
        }
      } else {
        res.status(401).end()
      }
    } else {
      res.status(400).json({message: `User does not exist for 'name' provided.`})
    }
  } else {
    res.status(400).json({message: `'name' not provided.`})
  }
}

const tripsController: TripsController = {
  CreateTrip,
  GetAllUserTrips,
  GetTrip,
  UpdateTrip,
  AddExpense,
  RemoveExpense,
  AddMember
}

export default tripsController
