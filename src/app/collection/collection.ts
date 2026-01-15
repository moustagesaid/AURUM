import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type CollectionProduct = {
  name: string;
  description: string;
  image: string;
};

@Component({
  selector: 'app-collection',
  templateUrl: './collection.html',
  styleUrl: './collection.css',
  standalone: true,
  imports: [CommonModule]
})
export class Collection {
  products: CollectionProduct[] = [
    {
      name: 'AUREUM',
      description: 'A luminous blend of golden amber and rare spices, capturing the essence of opulence.',
      image: '/assets/herosection.png'
    },
    {
      name: 'NOCTURNE',
      description: 'An enigmatic fusion of midnight florals and dark woods, mysterious and captivating.',
      image: '/assets/herosection.png'
    },
    {
      name: 'SOLARIS',
      description: 'Radiant citrus notes meet warm vanilla, evoking the brilliance of dawn.',
      image: '/assets/herosection.png'
    }
  ];
}
