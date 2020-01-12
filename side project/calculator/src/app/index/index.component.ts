import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  public tmp: string[] = [];

  public get view(): string {
    if (!this.tmp.length) return "0";
    if (this.tmp[0] == "0" && this.tmp[1] != "." && this.tmp.length > 1) this.tmp.shift();
    return this.tmp.join("");
  }

  private _mathod: string;

  public equal() {
    let mathods = ["+", "-", "x", "/"];

    let merge = [''];

    this.tmp.forEach(view => {
      let last = merge[merge.length - 1];
      if (mathods.includes(view) || mathods.includes(last)) {
        merge.push(view);
        return
      };
      merge[merge.length - 1] = last + view
    })

    let res = merge.reduce((a, b) => {

      if (mathods.includes(b)) {
        this._mathod = b;
        return a
      };

      if (!this._mathod) return a + b;

      return this._count(Number(a), Number(b)).toString();
    })

    this.tmp = res.split("")
  }

  private _count(a: number, b: number): number {
    let res: number;
    switch (this._mathod) {
      case "+":
        res = (a + b);
        break;
      case "-":
        res = (a - b);
        break;
      case "x":
        res = (a * b);
        break;
      case "/":
        res = (a / b);
        break;
    }

    this._mathod = null;
    return res;
  }

}
