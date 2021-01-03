import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CpuTurnPage } from './cpu-turn.page';

const routes: Routes = [
  {
    path: '',
    component: CpuTurnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CpuTurnPageRoutingModule {}
