import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger globally so it's available everywhere
gsap.registerPlugin(ScrollTrigger);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
