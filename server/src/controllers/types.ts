import {Request, RequestHandler} from 'express';
import {Trip} from '../db/types';

export type DecodeAuthHeader = (header: string) => {username: string, password: string}

export type IsAuthenticated = RequestHandler

export type AuthorizedForTrip = (name: string, trip: Trip) => boolean

export type AddExpenseToTrip = (name: string, amount: string, trip: Trip) => [Trip, string]

export type AddMemberToTrip = (name: string, trip: Trip) => Trip

export interface AuthenticatedReq extends Request {
  name: string
}

export interface AuthController {
  Signup: RequestHandler,
  Login: RequestHandler
}

export interface TripsController {
  CreateTrip: RequestHandler,
  GetAllUserTrips: RequestHandler,
  GetTrip: RequestHandler,
  UpdateTrip: RequestHandler,
  AddExpense: RequestHandler,
  RemoveExpense: RequestHandler,
  AddMember: RequestHandler
}
