import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KpiCardComponent {
  title = input.required<string>();
  value = input.required<string | number>();
  icon = input.required<string>();
  trend = input.required<number>();
  isCurrency = input<boolean>(false);
  subtitle = input<string>();

  Math = Math;

  getMainValue(): string {
    const val = this.value();
    if (typeof val === 'string') {
      const parts = val.split(' ');
      return parts[0] || val;
    }
    return String(val);
  }

  getSubValue(): string {
    const val = this.value();
    if (typeof val === 'string') {
      const parts = val.split(' ');
      return parts.slice(1).join(' ') || '';
    }
    return '';
  }

  hasSubValue(): boolean {
    return this.getSubValue().length > 0;
  }
}
