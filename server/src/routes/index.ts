import {Router} from 'express'
import authController from '../controllers/auth';
import tripsController from '../controllers/trips';

const auth = Router()
const trips = Router()

// Define auth routes
auth.post('/signup', authController.Signup)
auth.get(`/login`, authController.Login)

// Define trips routes
trips.post('/', tripsController.CreateTrip)
trips.get('/', tripsController.GetAllUserTrips)
trips.get('/:trip_id', tripsController.GetTrip)
trips.put('/:trip_id', tripsController.UpdateTrip)

export {auth, trips}
