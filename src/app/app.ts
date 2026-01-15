import { Component, signal } from '@angular/core';
import { Header } from "./header/header";
import { Hero } from "./hero/hero";
import { Collection } from "./collection/collection";

@Component({
  selector: 'app-root',
  imports: [Header, Hero, Collection],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('aurum');
}
