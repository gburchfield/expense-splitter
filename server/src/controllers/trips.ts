import {DummyHandler, TripsController} from './types';


const CreateTrip: DummyHandler = (req, res) => {
  res.json({message: 'dummy success message'})
}

const GetAllUserTrips: DummyHandler = (req, res) => {
  res.json({message: 'dummy success message'})
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
