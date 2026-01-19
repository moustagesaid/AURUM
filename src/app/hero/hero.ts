import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  standalone: true
})
export class Hero {
  selectedSize = '50ml';
  
  selectSize(size: string) {
    this.selectedSize = size;
  }
}
