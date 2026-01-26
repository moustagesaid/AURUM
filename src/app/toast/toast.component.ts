import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastService, ToastMessage } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {
  toastMessage: ToastMessage = { message: '', show: false };
  private subscription: Subscription = new Subscription();

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.subscription = this.toastService.toast$.subscribe(message => {
      this.toastMessage = message;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}