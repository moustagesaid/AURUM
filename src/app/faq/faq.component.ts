import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { accordionCollapse, chevronRotate } from './faq.animation';

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
}

export interface FaqCategory {
  id: string;
  name: string;
  icon: string;
  items: FaqItem[];
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  animations: [accordionCollapse, chevronRotate]
})
export class FaqComponent implements OnInit {

  searchQuery = '';
  filteredCategories: FaqCategory[] = [];

  categories: FaqCategory[] = [
    {
      id: 'boutique',
      name: 'The Boutique',
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 21V8L12 3L21 8V21H15V13H9V21H3Z" stroke="#C8A44F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7 21V13H11V21" stroke="#C8A44F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      items: [
        {
          id: 1,
          question: 'What makes AURUM fragrances unique?',
          answer: 'AURUM fragrances are crafted using rare, ethically-sourced ingredients from around the world. Each scent is a masterpiece of perfumery, inspired by the elemental beauty of gold itself—timeless, pure, and transformative.',
          isOpen: false
        },
        {
          id: 2,
          question: 'How do I choose the right fragrance for me?',
          answer: 'We recommend starting with our signature collection. Our expert perfumers suggest sampling three scents: one woody for sophistication, one floral for elegance, and one oriental for mystery. Visit our boutique for a personalized consultation.',
          isOpen: false
        },
        {
          id: 3,
          question: 'Are your products cruelty-free and sustainable?',
          answer: 'Absolutely. AURUM is committed to ethical luxury. All our fragrances are cruelty-free, vegan, and formulated with sustainably-sourced ingredients. We partner with conservation organizations to protect rare botanical species.',
          isOpen: false
        },
        {
          id: 4,
          question: 'Do you offer customization services?',
          answer: 'Yes, our Master Perfumer service allows you to create a bespoke fragrance. Through a detailed consultation process, we craft a scent that reflects your unique personality and preferences.',
          isOpen: false
        }
      ]
    },
    {
      id: 'shipping',
      name: 'Shipping & Delivery',
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 17V7H7V17M3 17H7M3 17V19H21V17M21 17H17M21 17V7H17M17 7V17M17 7H13V12H17M13 17V12M13 17H7" stroke="#C8A44F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="6" cy="18" r="2" stroke="#C8A44F" stroke-width="2"/>
        <circle cx="18" cy="18" r="2" stroke="#C8A44F" stroke-width="2"/>
      </svg>`,
      items: [
        {
          id: 5,
          question: 'How long does shipping take?',
          answer: 'We offer complimentary worldwide shipping. Orders typically arrive within 3-5 business days for domestic delivery, and 7-10 business days internationally. Express options are available for urgent needs.',
          isOpen: false
        },
        {
          id: 6,
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship to over 180 countries. International orders may be subject to customs duties and taxes, which are the responsibility of the recipient. We provide all necessary documentation for smooth customs clearance.',
          isOpen: false
        },
        {
          id: 7,
          question: 'What is your return policy?',
          answer: 'We offer a 30-day satisfaction guarantee. If you\'re not completely satisfied with your AURUM fragrance, return it in its original packaging for a full refund or exchange. Our concierge team will guide you through the process.',
          isOpen: false
        },
        {
          id: 8,
          question: 'How do you package orders?',
          answer: 'Every AURUM order is a work of art. Products arrive in handcrafted packaging featuring our signature gold wax seal, protective materials, and a personal note from our perfumers. Gift wrapping is complimentary.',
          isOpen: false
        }
      ]
    },
    {
      id: 'gifting',
      name: 'Gifting Service',
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="#C8A44F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 12V21M2 12H22M12 7V3C12 2.44772 12.4477 2 13 2H16C16.5523 2 17 2.44772 17 3V7" stroke="#C8A44F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 12L7 10L5 12L7 14L9 12Z" fill="#C8A44F"/>
        <path d="M19 12L17 10L15 12L17 14L19 12Z" fill="#C8A44F"/>
      </svg>`,
      items: [
        {
          id: 9,
          question: 'What is the AURUM Gifting Service?',
          answer: 'Our Gifting Service transforms ordinary presents into extraordinary experiences. Each gift is wrapped in hand-pressed silk paper, sealed with 24k gold wax, and accompanied by a personalized message and care instructions.',
          isOpen: false
        },
        {
          id: 10,
          question: 'Can I include a custom message?',
          answer: 'Certainly. We offer handwritten messages on premium cardstock, engraved nameplates, and even recorded voice messages for the most memorable gifts. Our gift concierge will help craft the perfect sentiment.',
          isOpen: false
        },
        {
          id: 11,
          question: 'Do you offer gift wrapping?',
          answer: 'Yes, our signature gift wrapping is complimentary with every purchase. Options include our classic gold and black motif, seasonal designs, and custom monogramming. All materials are sustainably sourced.',
          isOpen: false
        },
        {
          id: 12,
          question: 'Can I send gifts anonymously?',
          answer: 'We respect privacy and discretion. You may choose to remain anonymous, or include your name as the sender. We never disclose purchase information to recipients.',
          isOpen: false
        }
      ]
    },
    {
      id: 'care',
      name: 'Care & Preservation',
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="#C8A44F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 12L11 14L15 10" stroke="#C8A44F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 2V22M3 7L12 12L21 7" stroke="#C8A44F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      items: [
        {
          id: 13,
          question: 'How should I store my AURUM fragrance?',
          answer: 'Store your fragrance in a cool, dark place away from direct sunlight and heat sources. Our bottles are designed to preserve scent integrity for years. Avoid storing in bathrooms where humidity can affect the composition.',
          isOpen: false
        },
        {
          id: 14,
          question: 'How long does an AURUM fragrance last?',
          answer: 'When properly stored, AURUM fragrances maintain their original composition for 3-5 years. The scent may evolve beautifully over time, developing new depth and character. This is part of the luxury experience.',
          isOpen: false
        },
        {
          id: 15,
          question: 'Can I travel with AURUM fragrances?',
          answer: 'Our fragrances comply with all airline regulations for carry-on and checked luggage. For international travel, check specific destination requirements. We recommend our travel-sized atomizers for convenience.',
          isOpen: false
        },
        {
          id: 16,
          question: 'What if I receive a damaged bottle?',
          answer: 'Though rare, if you receive a damaged bottle, contact our concierge immediately. We will arrange for a replacement and cover all shipping costs. Your satisfaction and the integrity of our products are paramount.',
          isOpen: false
        }
      ]
    }
  ];

  ngOnInit(): void {
    this.filteredCategories = [...this.categories];
  }

  onSearchChange(): void {
    const query = this.searchQuery.toLowerCase().trim();

    if (!query) {
      this.filteredCategories = [...this.categories];
      return;
    }

    this.filteredCategories = this.categories.map(category => ({
      ...category,
      items: category.items.filter(item =>
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query)
      )
    })).filter(category => category.items.length > 0);
  }

  toggleAccordion(categoryId: string, itemId: number): void {
    const category = this.filteredCategories.find(cat => cat.id === categoryId);
    if (!category) return;

    const item = category.items.find(item => item.id === itemId);
    if (!item) return;

    // Close other items in the same category
    category.items.forEach(i => {
      if (i.id !== itemId) {
        i.isOpen = false;
      }
    });

    // Toggle the clicked item
    item.isOpen = !item.isOpen;
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.onSearchChange();
  }

  // TrackBy functions for better performance
  trackByCategory(index: number, category: FaqCategory): string {
    return category.id;
  }

  trackByItem(index: number, item: FaqItem): number {
    return item.id;
  }

  getSmallIcon(categoryId: string): string {
    const smallIcons: { [key: string]: string } = {
      'boutique': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 21V8L12 3L21 8V21H15V13H9V21H3Z" stroke="#C8A44F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      'shipping': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 17V7H7V17M3 17H7M3 17V19H21V17M21 17H17M21 17V7H17M17 7V17M17 7H13V12H17M13 17V12M13 17H7" stroke="#C8A44F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="6" cy="18" r="1.5" stroke="#C8A44F" stroke-width="2"/>
        <circle cx="18" cy="18" r="1.5" stroke="#C8A44F" stroke-width="2"/>
      </svg>`,
      'gifting': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="#C8A44F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 7V3C12 2.44772 12.4477 2 13 2H16C16.5523 2 17 2.44772 17 3V7" stroke="#C8A44F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 12L7 10L5 12L7 14L9 12Z" fill="#C8A44F"/>
        <path d="M19 12L17 10L15 12L17 14L19 12Z" fill="#C8A44F"/>
      </svg>`,
      'care': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="#C8A44F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 12L11 14L15 10" stroke="#C8A44F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
    };
    return smallIcons[categoryId] || '';
  }
}