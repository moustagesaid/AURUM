import {
  trigger,
  transition,
  style,
  animate,
  state,
  AnimationTriggerMetadata,
} from '@angular/animations';

/** Liquid Luxury easing: slow, fluid, deliberate */
const EASE_LUXURY = 'cubic-bezier(0.25, 0.8, 0.25, 1)';
const DURATION = 400;

/**
 * Reusable fade animation (in/out).
 */
export const fadeInOut: AnimationTriggerMetadata = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate(`${DURATION}ms ${EASE_LUXURY}`, style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate(`${DURATION}ms ${EASE_LUXURY}`, style({ opacity: 0 })),
  ]),
]);

/**
 * Fade in only (for route / section content).
 */
export const fadeIn: AnimationTriggerMetadata = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate(`600ms ${EASE_LUXURY}`, style({ opacity: 1 })),
  ]),
]);

/**
 * Slide up (y) with optional opacity.
 */
export const slideUp: AnimationTriggerMetadata = trigger('slideUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(24px)' }),
    animate(`500ms ${EASE_LUXURY}`, style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);

/**
 * Slide from left.
 */
export const slideFromLeft: AnimationTriggerMetadata = trigger('slideFromLeft', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-24px)' }),
    animate(`500ms ${EASE_LUXURY}`, style({ opacity: 1, transform: 'translateX(0)' })),
  ]),
]);

/**
 * Slide from right.
 */
export const slideFromRight: AnimationTriggerMetadata = trigger('slideFromRight', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(24px)' }),
    animate(`500ms ${EASE_LUXURY}`, style({ opacity: 1, transform: 'translateX(0)' })),
  ]),
]);

/**
 * Scale in (subtle zoom).
 */
export const scaleIn: AnimationTriggerMetadata = trigger('scaleIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.96)' }),
    animate(`500ms ${EASE_LUXURY}`, style({ opacity: 1, transform: 'scale(1)' })),
  ]),
]);

/**
 * Gold button hover: fill with gold, text tracks out (letter-spacing).
 * Use on buttons with class that supports the hover state.
 */
export const hoverGold: AnimationTriggerMetadata = trigger('hoverGold', [
  state('default', style({
    backgroundColor: 'transparent',
    color: '#C8A44F',
    letterSpacing: '2px',
  })),
  state('hover', style({
    backgroundColor: '#C8A44F',
    color: '#141416',
    letterSpacing: '4px',
  })),
  transition('default <=> hover', animate(`280ms ${EASE_LUXURY}`)),
]);

/**
 * Route transition: cross-fade when route changes.
 */
export const routeCrossFade: AnimationTriggerMetadata = trigger('routeCrossFade', [
  transition('* => *', [
    style({ opacity: 0 }),
    animate(`400ms ${EASE_LUXURY}`, style({ opacity: 1 })),
  ]),
]);
