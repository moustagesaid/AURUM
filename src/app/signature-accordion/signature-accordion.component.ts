import {
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
  QueryList,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';

export interface AccordionPanel {
  id: string;
  title: string;
  description: string;
  backgroundImage: string;
  path: string;
  queryParams?: Record<string, string>;
}

@Component({
  selector: 'app-signature-accordion',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './signature-accordion.component.html',
  styleUrl: './signature-accordion.component.css',
})
export class SignatureAccordionComponent implements OnInit, OnDestroy {
  @ViewChild('accordionContainer') accordionContainer!: ElementRef<HTMLElement>;
  @ViewChildren('panel') panelRefs!: QueryList<ElementRef<HTMLElement>>;

  private ngZone = inject(NgZone);
  activeIndex: number | null = null;
  private readonly DURATION = 0.8;
  private readonly EASE = 'power3.inOut';

  /** Placeholder luxury backgrounds – replace with real assets */
  panels: AccordionPanel[] = [
    {
      id: 'liquid-gold',
      title: 'Liquid Gold',
      description:
        'A radiant fusion of saffron and amber. Crafted for those who wear light.',
      backgroundImage: '/assets/goldliquid.png',
      path: '/products',
      queryParams: { category: 'women' },
    },
    {
      id: 'black-silk',
      title: 'Black Silk',
      description:
        'Midnight oud and velvet rose. The scent of restraint and power.',
      backgroundImage: '/assets/flower.png',
      path: '/products',
      queryParams: { category: 'men' },
    },
    {
      id: 'white-marble',
      title: 'White Marble',
      description:
        'Clean musk and white flowers. Timeless elegance in every drop.',
      backgroundImage: '/assets/black.png',
      path: '/products',
    },
  ];

  ngOnInit(): void {}

  ngOnDestroy(): void {
    gsap.killTweensOf(this.accordionContainer?.nativeElement);
    this.panelRefs?.forEach((ref) => gsap.killTweensOf(ref?.nativeElement));
  }

  onPanelEnter(index: number): void {
    this.ngZone.runOutsideAngular(() => this.animateToIndex(index));
  }

  onPanelLeave(): void {
    this.ngZone.runOutsideAngular(() => this.animateToIndex(null));
  }

  private animateToIndex(expandedIndex: number | null): void {
    const refs = this.panelRefs?.toArray();
    if (!refs?.length) return;

    const panels = refs.map((r) => r.nativeElement);
    const isExpanding = expandedIndex !== null;

    // Target flex-grow: expanded 3, others 1 => 60% / 20% / 20%
    const targetGrows =
      expandedIndex === null
        ? [1, 1, 1]
        : panels.map((_, i) => (i === expandedIndex ? 3 : 1));

    panels.forEach((panel, i) => {
      const verticalTitle = panel.querySelector('.panel-title-vertical') as HTMLElement;
      const contentBlock = panel.querySelector('.panel-content') as HTMLElement;

      gsap.to(panel, {
        flexGrow: targetGrows[i],
        duration: this.DURATION,
        ease: this.EASE,
        overwrite: true,
      });

      if (verticalTitle) {
        gsap.to(verticalTitle, {
          opacity: isExpanding && i === expandedIndex ? 0 : 1,
          duration: this.DURATION * 0.6,
          ease: this.EASE,
          overwrite: true,
        });
      }
      if (contentBlock) {
        gsap.to(contentBlock, {
          opacity: isExpanding && i === expandedIndex ? 1 : 0,
          duration: this.DURATION * 0.5,
          delay: isExpanding ? this.DURATION * 0.25 : 0,
          ease: this.EASE,
          overwrite: true,
        });
      }
    });

    this.ngZone.run(() => (this.activeIndex = expandedIndex));
  }
}
