import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CpuTurnService } from './cpu-turn.service';

@Component({
  selector: 'app-cpu-turn',
  templateUrl: './cpu-turn.page.html',
  styleUrls: ['./cpu-turn.page.scss'],
})
export class CpuTurnPage implements OnInit {
  
  constructor(private cpuTurnService:  CpuTurnService,
    private router: Router,
    private alertController: AlertController) { }

  playerBoard: number[][];
  playerSquaresSelected: number;
  gameStarted = false;
  waitTime = 2000;
  invalidPlayerBoardMessage = 'The battlefield positions are not valid';

  ngOnInit() {
    
    this.playerBoard = this.cpuTurnService.resetBoard(this.playerBoard);
    this.playerSquaresSelected = 0;
  }

  ionViewWillEnter() {

    if (!!this.gameStarted) {

      setTimeout(() => this.fetchGuessSquare(), this.waitTime);
    }
  }

  fetchGuessSquare() {

    this.cpuTurnService.fetchGuessSquare().subscribe(
      responseMap => {

        let x = responseMap.get('x');
        let y = responseMap.get('y');
        let cpuSquareResult = responseMap.get('squareResult');
        this.playerBoard[x][y] = cpuSquareResult;
        if (cpuSquareResult > 3) {

          this.showEndGameAlert(cpuSquareResult);
        } else {
        setTimeout(() => this.router.navigate(['/player-turn']), this.waitTime);
        }
      }
      ,error => {
        this.router.navigate(['/home']);
        this.showInternalServerErrorAlert();}
    )    
  }

  sendPlayerBoard() {
    
    this.cpuTurnService.sendPlayerBoard(this.playerBoard).subscribe(
      statusText => {
        if (statusText == 'OK') {
          
          this.gameStarted = true;
          this.router.navigate(['/player-turn']);
        }}
      ,error => {
        let errorMessage = error.error.message;
        if (errorMessage == this.invalidPlayerBoardMessage) {

          this.showInvalidBoardAlert(this.invalidPlayerBoardMessage);
        } else {

          this.router.navigate(['/home']);
          this.showInternalServerErrorAlert();
        }
      });      
  }

  selectSquare(x: number, y: number) {

    if (this.playerSquaresSelected < 20 && this.playerBoard[x][y] == 0) {

      this.playerBoard[x][y] = 1;
      this.playerSquaresSelected = this.playerSquaresSelected + 1;
    } else if (this.playerSquaresSelected <= 20 && this.playerBoard[x][y] == 1) {

      this.playerBoard[x][y] = 0;
      this.playerSquaresSelected = this.playerSquaresSelected - 1;
    }
  }

  resetPlayerBoard() {

    this.playerBoard = this.cpuTurnService.resetBoard(this.playerBoard);
    this.playerSquaresSelected = 0;
  }

  async showInvalidBoardAlert(errorMessage: string) {
    
    const alert = await this.alertController.create({
      header: 'Please try again',
      message: errorMessage,
      buttons: ['Try again']
    });

    await alert.present();
  }

  async showInternalServerErrorAlert() {

    const alert = await this.alertController.create({
      header: 'Oops, something went wrong',
      message: 'Please try again later',
      buttons: ['OK']
    });

    await alert.present();
  }

  async showEndGameAlert(totalCpuCounter: number) {
    
    const alert = await this.alertController.create({
      header: 'Game Over',
      message: 'Cpu won in '+totalCpuCounter+' tries',
      buttons: [{
        text: 'Return to main menu',
        handler: () => {this.router.navigate(['/home']);}
      }]
    });

    await alert.present();
  }
}
