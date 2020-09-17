import {Request, RequestHandler} from 'express';
import {Trip} from '../db/types';

export type DummyHandler = RequestHandler

export type DecodeAuthHeader = (header: string) => {username: string, password: string}

export type IsAuthenticated = RequestHandler

export type AuthorizedForTrip = (name: string, trip: Trip) => boolean

export interface AuthenticatedReq extends Request {
  name: string
}

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
