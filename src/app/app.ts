import { Component, signal } from '@angular/core';
import { Header } from "./header/header";
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from "./toast/toast.component";

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('aurum');
}
