import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { GameComponent } from './game/index/index.component';
import { SnakeComponent } from './game/snake/snake.component';

const routes: Routes = [
  { path: 'game', component: GameComponent },
  { path: 'game/snake', component: SnakeComponent },
  { path: '', component: IndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
