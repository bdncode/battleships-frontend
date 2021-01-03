import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerTurnPage } from './player-turn.page';

const routes: Routes = [
  {
    path: '',
    component: PlayerTurnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerTurnPageRoutingModule {}
