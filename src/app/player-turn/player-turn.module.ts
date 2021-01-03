import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayerTurnPageRoutingModule } from './player-turn-routing.module';

import { PlayerTurnPage } from './player-turn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayerTurnPageRoutingModule
  ],
  declarations: [PlayerTurnPage]
})
export class PlayerTurnPageModule {}
