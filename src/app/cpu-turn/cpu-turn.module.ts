import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CpuTurnPageRoutingModule } from './cpu-turn-routing.module';

import { CpuTurnPage } from './cpu-turn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CpuTurnPageRoutingModule
  ],
  declarations: [CpuTurnPage]
})
export class CpuTurnPageModule {}
