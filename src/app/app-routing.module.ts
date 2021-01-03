import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'cpu-turn',
    loadChildren: () => import('./cpu-turn/cpu-turn.module').then( m => m.CpuTurnPageModule)
  },
  {
    path: 'player-turn',
    loadChildren: () => import('./player-turn/player-turn.module').then( m => m.PlayerTurnPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
