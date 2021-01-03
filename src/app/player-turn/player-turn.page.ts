import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HomeService } from '../home/home.service';
import { PlayerTurnService } from './player-turn.service';

@Component({
  selector: 'app-player-turn',
  templateUrl: './player-turn.page.html',
  styleUrls: ['./player-turn.page.scss'],
})
export class PlayerTurnPage implements OnInit {
  
  constructor(private playerTurnService: PlayerTurnService,
    private homeService: HomeService,
    private router: Router,
    private alertController: AlertController) { }

  cpuBoard: number[][];
  position: number[];
  isLoading: boolean;
  isSending = false;
  playerWin = false;
  totalPlayerCounter: number;
  gameStarted: boolean;
  cpuBoardSubscription: any;  
  waitTime = 2000;

  ngOnInit() {

    this.cpuBoardSubscription = this.playerTurnService.fetchCpuBoardAsObservable.subscribe(
      cpuBoard => {
        this.cpuBoard = cpuBoard;
    });
  }

  ionViewWillEnter() {

    this.isLoading = true;
    this.playerTurnService.fetchTrackingBoard().subscribe(() => {
      this.isLoading = false;
    });

    this.cpuBoardSubscription = this.playerTurnService.fetchCpuBoardAsObservable.subscribe(
      cpuBoard => {
        this.cpuBoard = cpuBoard;
    });
  }

  sendGuessSquare(x: number,y: number) {

    if (!this.isSending) {

      this.isSending = true;
      this.playerTurnService.sendGuessSquare(x, y).subscribe(
        responseMap => {

          this.totalPlayerCounter = responseMap.get('squareResult');
          
          if (this.totalPlayerCounter > 3) {
            
            this.playerWin = true;
            this.showEndGameAlert(this.totalPlayerCounter);
            this.homeService.prepareNewGame().subscribe();//??
          } else {

            this.cpuBoard = responseMap.get('cpuBoard');          
            setTimeout(() => {
              this.router.navigate(['/cpu-turn']),
              this.isSending = false;
            }, this.waitTime);
          }        
        }, error => {
          this.router.navigate(['/home']);
          this.showInternalServerErrorAlert();});
    }
  }

  async showEndGameAlert(totalPlayerCounter: number) {
    
    const alert = await this.alertController.create({
      header: 'Congratulations',
      message: 'You won in '+totalPlayerCounter+' tries',
      buttons: [{
        text: 'Return to main menu',
        handler: () => {this.router.navigate(['/home']);}
      }]
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
}
