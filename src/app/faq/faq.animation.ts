import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationTriggerMetadata,
} from '@angular/animations';

/** Luxury easing curve for smooth accordion transitions */
const EASE_LUXURY = 'cubic-bezier(0.25, 0.8, 0.25, 1)';

/**
 * Accordion expand/collapse animation trigger.
 * Provides smooth height transitions for FAQ items.
 */
export const accordionCollapse: AnimationTriggerMetadata = trigger('accordionCollapse', [
  state('collapsed', style({
    height: '0',
    opacity: '0',
    overflow: 'hidden',
    paddingTop: '0',
    paddingBottom: '0'
  })),
  state('expanded', style({
    height: '*',
    opacity: '1',
    overflow: 'visible',
    paddingTop: '*',
    paddingBottom: '*'
  })),
  transition('collapsed <=> expanded', [
    animate(`400ms ${EASE_LUXURY}`)
  ])
]);

/**
 * Icon rotation animation for accordion chevrons.
 */
export const chevronRotate: AnimationTriggerMetadata = trigger('chevronRotate', [
  state('collapsed', style({
    transform: 'rotate(0deg)'
  })),
  state('expanded', style({
    transform: 'rotate(180deg)'
  })),
  transition('collapsed <=> expanded', [
    animate(`300ms ${EASE_LUXURY}`)
  ])
]);