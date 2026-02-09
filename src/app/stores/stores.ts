import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, AnimationTriggerMetadata } from '@angular/animations';

/** Luxury easing curve for smooth transitions */
const EASE_LUXURY = 'cubic-bezier(0.25, 0.8, 0.25, 1)';

/**
 * Fade in animation for store elements
 */
export const fadeInUp: AnimationTriggerMetadata = trigger('fadeInUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(30px)' }),
    animate(`800ms ${EASE_LUXURY}`, style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);

/**
 * Scale in animation for cards
 */
export const scaleInCard: AnimationTriggerMetadata = trigger('scaleInCard', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.95)' }),
    animate(`600ms ${EASE_LUXURY}`, style({ opacity: 1, transform: 'scale(1)' })),
  ]),
]);

/**
 * Slide in from left animation
 */
export const slideInLeft: AnimationTriggerMetadata = trigger('slideInLeft', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-40px)' }),
    animate(`700ms ${EASE_LUXURY}`, style({ opacity: 1, transform: 'translateX(0)' })),
  ]),
]);

/**
 * Slide in from right animation
 */
export const slideInRight: AnimationTriggerMetadata = trigger('slideInRight', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(40px)' }),
    animate(`700ms ${EASE_LUXURY}`, style({ opacity: 1, transform: 'translateX(0)' })),
  ]),
]);

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stores.html',
  styleUrl: './stores.css',
  animations: [fadeInUp, scaleInCard, slideInLeft, slideInRight]
})
export class Stores {
  constructor() {}
}