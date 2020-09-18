import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Trip} from '../../server/src/db/types';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  tripsUrl = 'trips'
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private http: HttpClient
  ) { }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl, this.httpOptions)
      .pipe(
        catchError(this.handleError<Trip[]>('getTrips', []))
      )
  }

  getTrip(id): Observable<Trip | string> {
    return this.http.get<Trip>(this.tripsUrl + `/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError<string>('getTrip', `Error getting tripId: ${id}`))
      )
  }

  createTrip(body: TripBody): Observable<CreateTripRes | string> {
    return this.http.post<CreateTripRes>(this.tripsUrl, body, this.httpOptions)
      .pipe(
        catchError(this.handleError<string>('createTrip', 'Error creating trip.'))
      )
  }

  addMember(body: MemberBody, tripId: string): Observable<null | string> {
    return this.http.post<null>(this.tripsUrl + `/${tripId}/members`, body, this.httpOptions)
      .pipe(
        catchError(this.handleError<string>('addMember', `Error adding member ${body.name} to tripId: ${tripId}`))
      )
  }

  addExpense(body: ExpenseBody, tripId: string): Observable<null | string> {
    return this.http.post<null>(this.tripsUrl + `/${tripId}/expenses`, body, this.httpOptions)
      .pipe(
        catchError(this.handleError<string>('addExpense', `Error adding expense ${body.amount} to tripId: ${tripId}`))
      )
  }

  private handleError<T>(operation = 'operation', result?: T): (err: any) => Observable<T> {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.log(operation)
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

export interface TripBody {
  name: string
}

export interface MemberBody {
  name: string
}

export interface ExpenseBody {
  amount: string
}

interface CreateTripRes {
  tripId: string
}
