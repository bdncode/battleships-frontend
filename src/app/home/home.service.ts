import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) {}

  private baseUrl = 'http://localhost:8080/api/v1/battle';
  private newGame = '/new-game';

  prepareNewGame() {

    return this.httpClient.get<boolean>(this.baseUrl + this.newGame)
    .pipe(
      map(responseEntity => {
        return responseEntity;}))
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {

    return throwError(error);
  }
}
