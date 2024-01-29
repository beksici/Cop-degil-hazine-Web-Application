import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
//{providedIn: 'root'} global olarak tanımlamak istiyorsan kullanırsın
export class BreadCrum {
  constructor() {}

  categoryUpBread: string;
  categoryUpDown: string;

  setBread(categoryUpBread: string, categoryUpDown: string) {
    this.categoryUpBread = categoryUpBread;
    this.categoryUpDown = categoryUpDown;
  }
  getBread() {
    console.log(this.categoryUpBread + '/' + this.categoryUpDown);

    return this.categoryUpBread + '/' + this.categoryUpDown;
  }
}
