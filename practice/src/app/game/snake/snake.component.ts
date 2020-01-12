import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit {
  @ViewChild('snake') snake: ElementRef;
  public timer: NodeJS.Timer;
  constructor() { }

  ngOnInit() {
    //this._snakeMove()

  }

  private _snakeMove() {
    const snake = this.snake.nativeElement as HTMLElement;
    const touchRight = (snake.offsetLeft + 20) >= document.body.offsetWidth;
    const touchDown = (snake.offsetTop + 20) >= document.body.offsetHeight - 500;
    const touchLeft = snake.offsetLeft - 10 <= 0;
    if (touchLeft && touchDown) {
      this._goUp(snake);
    } else if (touchDown && touchRight) {
      this._goLeft(snake);
    } else if (touchRight) {
      this._goDown(snake);
    } else {
      this._goRight(snake);
    }
  }

  private _goRight(snake) {
    snake.style.left = snake.offsetLeft + 10 + 'px';
  }
  private _goLeft(snake) {
    snake.style.left = snake.offsetLeft - 10 + 'px';
  }
  private _goUp(snake) {
    console.log(snake.offsetTop)
    snake.style.top = snake.offsetTop - 10 + 'px';
  }
  private _goDown(snake) {
    console.log(snake.offsetTop)
    snake.style.top = snake.offsetTop + 10 + 'px';
  }
}
