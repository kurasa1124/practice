import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/index/index.component';
import { IndexComponent } from './index/index.component';
import { SnakeComponent } from './game/snake/snake.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    GameComponent,
    SnakeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
