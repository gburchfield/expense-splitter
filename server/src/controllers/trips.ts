import {AuthenticatedReq, DummyHandler, TripsController} from './types';
import {createTripDoc} from './helpers';
import db from '../db';
import {CollectionWrapper, RequireKeys, Trip} from '../db/types';

const CreateTrip: DummyHandler = async (req, res) => {
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

const GetAllUserTrips: DummyHandler = async (req, res) => {
  const {name} = req as AuthenticatedReq
  const DB = db.getConnection()
  const trips = await (DB.trips as RequireKeys<CollectionWrapper<Trip>, 'find'>).find({name})
  res.status(200).json(trips)
}

const GetTrip: DummyHandler = (req, res) => {
  res.json({message: 'dummy success message'})
}

const UpdateTrip: DummyHandler = (req, res) => {
  res.json({message: 'dummy success message'})
}

const tripsController: TripsController = {
  CreateTrip,
  GetAllUserTrips,
  GetTrip,
  UpdateTrip
}

export default tripsController
