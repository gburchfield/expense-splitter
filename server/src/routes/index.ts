import {Router} from 'express'
import authController from '../controllers/auth';
import tripsController from '../controllers/trips';
import {isAuthenticated} from '../controllers/helpers';

const auth = Router()
const trips = Router()

// Define auth routes
auth.post('/signup', authController.Signup)
auth.get(`/login`, authController.Login)

// Define trips routes
trips.use(isAuthenticated)
trips.post('/', tripsController.CreateTrip)
trips.get('/', tripsController.GetAllUserTrips)
trips.get('/:trip_id', tripsController.GetTrip)
trips.put('/:trip_id', tripsController.UpdateTrip)
trips.post('/:trip_id/expenses', tripsController.AddExpense)
trips.delete('/:trip_id/expenses/:expense_id', tripsController.RemoveExpense)
trips.post('/:trip_id/members', tripsController.AddMember)

export {auth, trips}
