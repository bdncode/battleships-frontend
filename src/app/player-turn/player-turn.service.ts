import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { throwError } from 'rxjs';

interface squareResponseEntity {

  cpuBoard: number[][],
  x: number,
  y: number,
  squareResult: number
}

@Injectable({
  providedIn: 'root'
})
export class PlayerTurnService {

  constructor(private httpClient: HttpClient) {}

  private baseUrl = 'http://localhost:8080/api/v1/battle';
  private sendGuessSquareUri = '/player-square';  
  private cpuBoardUri = '/cpu-board';
  private _trackingBoard = new BehaviorSubject<number[][]>([]);

  get fetchCpuBoardAsObservable() {

    return this._trackingBoard.asObservable();
  }

  fetchTrackingBoard() {
    
    return this.httpClient.get<number[][]>(
      this.baseUrl + this.cpuBoardUri).pipe(
        map(responseEntity => {return responseEntity;}),
        tap(trackingBoard => {this._trackingBoard.next(trackingBoard)}))
      .pipe(catchError(this.handleError));
  }

  sendGuessSquare(x: number, y: number) {

    const playerSquare: any = {};
    playerSquare.x = x;
    playerSquare.y = y;

    return this.httpClient.post<squareResponseEntity>(
      this.baseUrl + this.sendGuessSquareUri,
      playerSquare,
      {observe: 'response', responseType: 'json'}).pipe(
        map (responseEntity => {
          let responseMap = new Map();
          responseMap.set('cpuBoard', responseEntity.body.cpuBoard);
          responseMap.set('squareResult', responseEntity.body.squareResult);
          return responseMap;}))
        .pipe(catchError(this.handleError));
  }
  
  private handleError(error: HttpErrorResponse) {

    return throwError(error);
  }
}
