import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { Collection } from '../collection/collection';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, Collection],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
}
