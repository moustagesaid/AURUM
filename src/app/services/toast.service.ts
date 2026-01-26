import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ToastMessage {
  message: string;
  show: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<ToastMessage>({ message: '', show: false });
  public toast$: Observable<ToastMessage> = this.toastSubject.asObservable();

  constructor() { }

  /**
   * Show a toast message for 3 seconds
   * @param message The message to display
   */
  show(message: string): void {
    // Show the toast
    this.toastSubject.next({ message, show: true });

    // Hide the toast after 3 seconds
    setTimeout(() => {
      this.toastSubject.next({ message: '', show: false });
    }, 3000);
  }

  /**
   * Hide the current toast immediately
   */
  hide(): void {
    this.toastSubject.next({ message: '', show: false });
  }
}