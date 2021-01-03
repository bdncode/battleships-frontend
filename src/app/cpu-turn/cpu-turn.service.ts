import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
export class CpuTurnService {

  constructor(private httpClient: HttpClient) {}

  private baseUrl = 'http://localhost:8080/api/v1/battle';
  private playerBoardUri = '/player-board';
  private cpuSquareUri = '/cpu-square';
  private newGame = '/new-game';

  sendPlayerBoard(board: number[][]) {

    const playerBoard: any = {};
    playerBoard.board = board;

    return this.httpClient.post<number[][]>(
      this.baseUrl + this.playerBoardUri,
      playerBoard,
      {observe: 'response', responseType: 'json'}).pipe(
        map (responseEntity => {return responseEntity.statusText;}))
      .pipe(catchError(this.handleError));
  }

  fetchGuessSquare() {

    return this.httpClient.get<squareResponseEntity>(this.baseUrl + this.cpuSquareUri)
    .pipe(
      map(responseEntity => {
        let responseMap = new Map();
        responseMap.set('x', responseEntity.x);
        responseMap.set('y', responseEntity.y);
        responseMap.set('squareResult', responseEntity.squareResult);
        return responseMap;}))
      .pipe(catchError(this.handleError));
  }

  prepareNewGame() {

    return this.httpClient.get<boolean>(this.baseUrl + this.newGame)
    .pipe(
      map(responseEntity => {return responseEntity;}))
      .pipe(catchError(this.handleError));
  }

  resetBoard(board: number[][]) {

    const row0 = ([...Array(10).fill(0)]);
    const row1 = ([...Array(10).fill(0)]);
    const row2 = ([...Array(10).fill(0)]);
    const row3 = ([...Array(10).fill(0)]);
    const row4 = ([...Array(10).fill(0)]);
    const row5 = ([...Array(10).fill(0)]);
    const row6 = ([...Array(10).fill(0)]);
    const row7 = ([...Array(10).fill(0)]);
    const row8 = ([...Array(10).fill(0)]);
    const row9 = ([...Array(10).fill(0)]);
    return board = [row0, row1, row2, row3, row4, row5, row6, row7, row8, row9];
  }

  private handleError(error: HttpErrorResponse) {

    return throwError(error);
  }
}
