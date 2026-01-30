import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Hero } from '../hero/hero';
import { SignatureAccordionComponent } from '../signature-accordion/signature-accordion.component';
import { OrderService, Order } from '../services/order.service';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Hero, SignatureAccordionComponent, FormsModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit, OnDestroy {
  // Video state management
  videoActive = false;
  textHidden = false;
  indicatorHidden = false;

  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef<HTMLVideoElement>;

  private scrollTriggers: ScrollTrigger[] = [];
  private heroTl: gsap.core.Timeline | null = null;

  // Signature Collection with Olfactory Pyramid
  signatureCollection = [
    {
      id: 'aurum',
      name: 'AURUM',
      tagline: 'A majestic blend of rare oudh and saffron, embodying the essence of pure luxury and timeless elegance.',
      image: '/assets/aurumaxis.png',
      notes: [
        {
          name: 'Saffron',
          type: 'Top',
          icon: '🌸',
          description: 'Rare Persian saffron threads, harvested at dawn for their golden essence.'
        },
        {
          name: 'Oudh',
          type: 'Heart',
          icon: '🌿',
          description: 'Precious agarwood essence, aged for decades in sacred forests.'
        },
        {
          name: 'Amber',
          type: 'Base',
          icon: '💎',
          description: 'Fossilised tree resin, warmed by ancient sunlight and time.'
        }
      ]
    },
    {
      id: 'nocturne',
      name: 'NOCTURNE',
      tagline: 'An intoxicating midnight symphony of dark amber, vanilla, and exotic spices that unfolds like a secret.',
      image: '/assets/aurumvant.png',
      notes: [
        {
          name: 'Bergamot',
          type: 'Top',
          icon: '🍊',
          description: 'Italian bergamot essence, bright and citrus-fresh from Calabrian groves.'
        },
        {
          name: 'Jasmine',
          type: 'Heart',
          icon: '🌸',
          description: 'Night-blooming jasmine sambac, picked at midnight for maximum potency.'
        },
        {
          name: 'Vanilla',
          type: 'Base',
          icon: '🌰',
          description: 'Bourbon vanilla pods from Madagascar, cured for two years in darkness.'
        }
      ]
    }
  ];

  reviews = [
    {
      name: 'Sophia Rodriguez',
      rating: 5,
      comment: 'Aurum has transformed my signature scent. The craftsmanship is unparalleled.'
    },
    {
      name: 'Marcus Chen',
      rating: 5,
      comment: 'Every note tells a story. This fragrance is pure poetry in a bottle.'
    },
    {
      name: 'Isabella Thompson',
      rating: 5,
      comment: 'The longevity and depth of Nocturne is remarkable. Worth every moment of anticipation.'
    }
  ];

  newReview = {
    name: '',
    rating: 5,
    comment: ''
  };


  constructor(
    private orderService: OrderService,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  ngAfterViewInit(): void {
    this.initHeroEntrance();
    this.initGlassCardsScrollTrigger();
    this.initParallax();
    this.initBackgroundTransition();
  }

  ngOnDestroy(): void {
    this.scrollTriggers.forEach(st => st.kill());
    this.scrollTriggers = [];
    this.heroTl?.kill();
  }

  /** Hero: background scale 1.2 -> 1, title letters slide up (stagger), buttons from sides */
  private initHeroEntrance(): void {
    const host = this.elementRef.nativeElement;
    const heroSection = host.querySelector('app-hero');
    if (!heroSection) return;

    const bg = heroSection.querySelector('.hero-bg') as HTMLElement;
    const letters = heroSection.querySelectorAll('.hero-title-letter');
    const btnWomen = heroSection.querySelector('.btn-women') as HTMLElement;
    const btnMen = heroSection.querySelector('.btn-men') as HTMLElement;
    const ctaBtn = heroSection.querySelector('.cta-button') as HTMLElement;

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    if (bg) {
      gsap.set(bg, { scale: 1.2 });
      tl.to(bg, { scale: 1, duration: 3, ease: 'power2.out' }, 0);
    }

    if (letters.length) {
      gsap.set(letters, { yPercent: 100 });
      tl.to(letters, {
        yPercent: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power2.out',
      }, 0.4);
    }

    if (btnWomen) {
      gsap.set(btnWomen, { x: -80, opacity: 0 });
      tl.to(btnWomen, { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out' }, 0.6);
    }
    if (btnMen) {
      gsap.set(btnMen, { x: 80, opacity: 0 });
      tl.to(btnMen, { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out' }, 0.6);
    }
    if (ctaBtn) {
      gsap.set(ctaBtn, { y: 30, opacity: 0 });
      tl.to(ctaBtn, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.7);
    }

    this.heroTl = tl;
  }

  /** Glass cards (gifting + reviews): float up (y: 100 -> 0) with opacity on scroll */
  private initGlassCardsScrollTrigger(): void {
    const host = this.elementRef.nativeElement;
    const cards = host.querySelectorAll('.content-card, .glass-card');
    cards.forEach((el, i) => {
      const card = el as HTMLElement;
      gsap.set(card, { y: 100, opacity: 0 });
      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        end: 'top 50%',
        scroller: window,
        onEnter: () => {
          gsap.to(card, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            overwrite: true,
          });
        },
      });
      this.scrollTriggers.push(st);
    });
  }

  /** Parallax: gifting section background moves slower than scroll for depth */
  private initParallax(): void {
    const host = this.elementRef.nativeElement;
    const giftingSection = host.querySelector('.gifting-section') as HTMLElement;
    if (!giftingSection) return;

    const st = ScrollTrigger.create({
      trigger: giftingSection,
      start: 'top bottom',
      end: 'bottom top',
      scroller: window,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const offset = (progress - 0.5) * 80;
        giftingSection.style.backgroundPosition = `center ${offset}px`;
      },
    });
    this.scrollTriggers.push(st);
  }

  /** Placeholder for smooth background color transition (dark <-> light sections) */
  private initBackgroundTransition(): void {
    // Sections use their own backgrounds; add a body/wrapper transition here if needed
  }

  // Video control methods
  onPlayButtonClick() {
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.play();
      this.videoActive = true;
      this.textHidden = true;
      this.indicatorHidden = true;
    }
  }

  onVideoEnd() {
    this.videoActive = false;
    this.textHidden = false;
    this.indicatorHidden = false;
  }

  // Methods
  submitReview() {
    if (this.newReview.name && this.newReview.comment) {
      this.reviews.push({ ...this.newReview });
      this.newReview = { name: '', rating: 5, comment: '' };
    }
  }

  addToCart(product: any) {
    console.log('Added to cart:', product);
  }
}
