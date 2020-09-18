import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'auth'

  constructor(
    private http: HttpClient) { }

  getLogin(authHeaderValues: AuthHeaderValues): Observable<void | string> {
    const httpOptions = {
      headers: new HttpHeaders({Authorization: makeAuthHeader(authHeaderValues)})
    }
    return this.http.get<void | string>(this.authUrl + '/login', httpOptions)
      .pipe(
        catchError(this.handleError<string>('getLogin', 'Login Failed'))
      )
  }

  postSignup(body: UserBody): Observable<{message: string}> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-type': 'application/json'})
    }
    return this.http.post<{message: string}>(this.authUrl + '/signup', body, httpOptions)
      .pipe(
        catchError(this.handleError<{message: string}>('postSignup', {message: 'That username MIGHT be taken... I\'ll keep you guessing.'}))
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

const makeAuthHeader = (values: AuthHeaderValues): string => {
  const tokenRaw = `${values.username}:password`
  const token = btoa(tokenRaw)
  return `Basic ${token}`
}

export interface AuthHeaderValues {
  username: string
}

export interface UserBody {
  name: string
}
