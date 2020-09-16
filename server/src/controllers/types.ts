import {NextFunction, Request, Response} from 'express';

export type DummyHandler = (req: Request, res: Response, next?: NextFunction) => void

export interface AuthController {
  Signup: DummyHandler,
  Login: DummyHandler
}

export interface TripsController {
  CreateTrip: DummyHandler,
  GetAllUserTrips: DummyHandler,
  GetTrip: DummyHandler,
  UpdateTrip: DummyHandler
}
