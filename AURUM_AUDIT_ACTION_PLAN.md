# AURUM — "Perfect Website" Audit & QA Action Plan

**Role:** Senior QA Engineer & UX Auditor | **Scope:** Logic, Luxury Polish, Admin

---

## 1. Critical Missing Features (Must Build Now)

- **404 "Lost in Luxury" Page**
  - **Gap:** No wildcard route. Wrong URLs (e.g. `/perfume/xyz`) leave a blank outlet or undefined behavior; Angular does not redirect to Home by default.
  - **Action:** Add a `NotFoundComponent` ("Lost in Luxury" copy, gold CTA back to Home) and register `{ path: '**', component: NotFoundComponent }` as the last route.

- **Scroll-to-Top on Navigation**
  - **Gap:** After navigating (e.g. footer link → new page), the viewport stays at the previous scroll position. Angular does not scroll to top automatically.
  - **Action:** Add a `ScrollToTopService` that subscribes to `Router.events` (NavigationEnd) and runs `window.scrollTo(0, 0)` in the browser. Inject and run once in `App` (or in a root initializer).

- **Toast on Add-to-Cart (Home)**
  - **Gap:** Products page and product-slider already call `ToastService.show()` after add-to-cart. **Home** `addToCart()` only does `console.log` — no user feedback.
  - **Action:** In `home.ts`, inject `ToastService` and after adding to cart call `this.toastService.show(\`${product.name} added to your collection\`)`.

- **Favicon & Meta Tags**
  - **Gap:** `index.html` has `<link rel="icon" href="">` (empty). Tab shows default/favicon.ico from public but href is blank; no OG/description meta for sharing.
  - **Action:** Set `href="/favicon.ico"` (or path to AURUM logo asset). Add `<meta name="description" content="...">` and optional OG tags for luxury branding.

- **Admin: Logged-In Redirect from Login**
  - **Gap:** If an admin is already logged in and visits `/admin/login`, they stay on the login page (no redirect). Wastes time and feels broken.
  - **Action:** In `AdminLoginComponent`, run a check in `ngOnInit`: if `localStorage.getItem('adminSession')` exists, `router.navigate(['/admin/dashboard'])`. Alternatively add an `AlreadyLoggedInGuard` for the login route.

---

## 2. UX Logic Fixes (Annoying Things to Fix)

- **Form Validation Feedback (Login/Signup)**
  - **Status:** You already show inline error messages (e.g. "Email is required", "Enter a valid email") when `touched && invalid`. Gold focus states exist; inputs use `outline: none` and gold border on focus.
  - **Improvement:** Add a clear invalid state for inputs: e.g. `.form-input.ng-invalid.ng-touched { border-color: rgba(239, 68, 68, 0.6); }` so invalid fields get a subtle red border before submit, reinforcing the message.

- **Auth Guard (No Aggressive Redirect)**
  - **Status:** Your `AuthGuard` only protects dashboard children; it does **not** redirect already-logged-in users away from `/login` or `/admin/login`. So you’re not "redirecting logged-in users back to login" — the only redirect is unauthenticated → `/admin/login`, which is correct.
  - **Fix:** Ensure logged-in admins don’t see the login page (see Critical: Admin logged-in redirect above). No change needed for the main app login/account flow.

- **Default Browser Styles (Focus)**
  - **Gap:** Many components use `outline: none` on inputs/buttons. Some use `:focus-visible` with gold (e.g. accordion, hero). There is no **global** gold focus-visible rule, so buttons/links can still show the default blue focus ring in some browsers.
  - **Action:** In `styles.css`, add a global rule: `button:focus-visible, a:focus-visible, [tabindex="0"]:focus-visible { outline: 2px solid var(--accent-gold); outline-offset: 2px; }` and keep `outline: none` only on `:focus` (not focus-visible) if needed for mouse users. Prefer replacing default focus with gold, not only removing it.

- **Admin Delete Product Confirmation**
  - **Status:** Product list uses `confirm()` for delete — so "Are you sure?" exists, but it’s the native browser dialog.
  - **Improvement:** Replace with a custom modal ("Remove [Name] from the collection?" with Gold "Cancel" / "Remove" buttons) for a luxury-consistent experience.

---

## 3. Performance & Polish (To Make It Luxury)

- **Loading States (Admin Dashboard)**
  - **Gap:** While `getAllOrders()` runs, `isLoading` is true but the template still shows the full layout (KPI cards with 0, chart, table). No skeleton/shimmer — on slow networks it can feel like a broken or empty screen.
  - **Action:** When `isLoading`, show skeleton/shimmer placeholders for the KPI cards, chart area, and recent-orders table instead of real content. Swap to real content when `isLoading` is false.

- **Empty States (Admin)**
  - **Dashboard Recent Activity:** When `recentOrders.length === 0`, the table shows only the header row. No "No orders yet" message or illustration.
  - **Action:** Add a row or a dedicated block: e.g. "No orders yet — your premium transactions will appear here" with a subtle graphic or icon.
  - **Recent-orders-table component:** Same idea when `orders().length === 0`: show an empty state message instead of a bare table.

- **Lazy Loading (Accordion)**
  - **Gap:** Accordion panels use `backgroundImage` in style (CSS). There’s no `loading="lazy"` (that’s for `<img>`). Background images load with the page and can slow LCP.
  - **Action:** Option A: Use `<img>` with `loading="lazy"` and position as background for each panel. Option B: Keep backgrounds but load image URLs only when the panel is near the viewport (e.g. Intersection Observer) and then set the background. Either reduces initial load and improves perceived performance.

- **Animations**
  - **Status:** You use GSAP for accordion and dashboard counters, and Angular animations for route cross-fade. No obvious "jump" or non-60fps animation was found in the reviewed code.
  - **Action:** Avoid any animation that triggers reflow in a tight loop; keep using GSAP/Angular for transitions. If you add new animations, test on low-end devices and prefer `transform`/`opacity`.

---

## 4. Summary Table

| Item | Category | Status |
|------|----------|--------|
| 404 page | Critical | Missing — add wildcard + NotFound |
| Scroll-to-top | Critical | Missing — add service + subscribe in App |
| Toast on Add-to-Cart (Home) | Critical | Missing — wire ToastService in home.ts |
| Favicon + meta | Critical | Broken/empty — fix href + add meta |
| Admin login redirect when logged in | Critical | Missing — redirect in AdminLogin or guard |
| Form invalid border | UX | Optional — add .ng-invalid.ng-touched |
| Global gold focus-visible | UX | Missing — add in styles.css |
| Admin delete modal | UX | Native confirm — replace with custom modal |
| Dashboard skeletons | Polish | Missing — add when isLoading |
| Empty orders state | Polish | Missing — "No orders yet" in dashboard + table |
| Accordion lazy load | Polish | Missing — lazy img or IO for backgrounds |

---

## 5. Code Snippets for Highest-Impact Pieces

### 5.1 ScrollToTop Service

```typescript
// src/app/services/scroll-to-top.service.ts
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ScrollToTopService {
  constructor(private router: Router) {}

  init(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
        }
      });
  }
}
```

**Usage in `app.config.ts` or `App` constructor:** Inject `ScrollToTopService` and call `scrollToTopService.init()` once at bootstrap (e.g. in `App.ngOnInit()` or in an APP_INITIALIZER).

### 5.2 Global Error Handler (Optional — for 404 and unhandled errors)

```typescript
// src/app/global-error.handler.ts
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: unknown): void {
    console.error('AURUM Error:', error);
    const router = this.injector.get(Router);
    // Optional: router.navigate(['/lost']); for unhandled client errors
  }
}
```

Register in `app.config.ts`: `provideErrorHandler(GlobalErrorHandler)`.

### 5.3 404 Route and Component

**Routes (add last in `app.routes.ts`):**
```typescript
{
  path: 'lost',
  loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent)
},
{
  path: '**',
  redirectTo: 'lost',
  pathMatch: 'full'
}
```

**Minimal NotFound component:** Title "Lost in Luxury", subtitle "This page has drifted beyond the veil.", CTA button `[routerLink]="['/']"` "Return to the Collection".

### 5.4 Global Gold Focus-Visible (styles.css)

```css
/* Replace default focus with gold brand focus */
button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
[tabindex="0"]:focus-visible {
  outline: 2px solid var(--accent-gold);
  outline-offset: 2px;
}

button:focus,
a:focus {
  outline: none;
}
```

Use `:focus-visible` for the gold ring (keyboard) and `:focus` only to remove outline for mouse users where desired.

---

*End of Audit — AURUM*
