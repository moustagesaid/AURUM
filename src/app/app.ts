import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { Header } from "./header/header";
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { ToastComponent } from "./toast/toast.component";
import { routeCrossFade } from './animations';
import { filter } from 'rxjs/operators';
import { ScrollToTopService } from './services/scroll-to-top.service';

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [routeCrossFade],
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('aurum');

  routeAnimationKey = '';

  private sub: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private router: Router,
    private scrollToTopService: ScrollToTopService
  ) {}

  ngOnInit(): void {
    this.scrollToTopService.init();
    this.routeAnimationKey = this.router.url;
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        if (this.sub) clearTimeout(this.sub);
        this.sub = setTimeout(() => {
          this.routeAnimationKey = this.router.url;
          this.sub = null;
        }, 0);
      });
  }

  ngOnDestroy(): void {
    if (this.sub) clearTimeout(this.sub);
  }
}
