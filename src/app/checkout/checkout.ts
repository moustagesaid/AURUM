import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  standalone: true,
  template: `
    <div class="checkout-container">
      <h1>Checkout</h1>
      <p>Checkout functionality will be implemented here.</p>
    </div>
  `,
  styles: [`
    .checkout-container {
      padding: 60px 20px;
      text-align: center;
      background: var(--theme-bg-dark);
      color: var(--theme-text-light);
      min-height: 100vh;
    }

    h1 {
      font-family: var(--theme-font-serif);
      font-size: 32px;
      margin-bottom: 20px;
    }

    p {
      font-family: var(--theme-font-sans);
      font-size: 18px;
    }
  `]
})
export class Checkout {

}