import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { MenuShowcaseComponent } from '../../components/menu-showcase/menu-showcase.component';
import { AboutComponent } from '../../components/about/about.component';
import { ReviewsComponent } from '../../components/reviews/reviews.component';
import { CartDrawerComponent } from '../../components/cart-drawer/cart-drawer.component';
import { MobileBottomNavComponent } from '../../components/mobile-bottom-nav/mobile-bottom-nav.component';
import { MobileAppShellComponent } from '../../components/mobile-app-shell/mobile-app-shell.component';
import { ReservationModalComponent } from '../../components/reservation-modal/reservation-modal.component';
import { StoryModalComponent } from '../../components/story-modal/story-modal.component';
import { AuthModalComponent } from '../../components/auth-modal/auth-modal.component';
import { UserProfileModalComponent } from '../../components/user-profile-modal/user-profile-modal.component';
import { SuperAdminBarComponent } from '../../components/super-admin-bar/super-admin-bar.component';
import { LiveSectionEditorModalComponent } from '../../components/live-section-editor-modal/live-section-editor-modal.component';
import { ToastComponent } from '../../components/toast/toast.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-customer-shell',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    MenuShowcaseComponent,
    AboutComponent,
    ReviewsComponent,
    CartDrawerComponent,
    MobileBottomNavComponent,
    MobileAppShellComponent,
    ReservationModalComponent,
    StoryModalComponent,
    AuthModalComponent,
    UserProfileModalComponent,
    SuperAdminBarComponent,
    LiveSectionEditorModalComponent,
    ToastComponent,
    FooterComponent
  ],
  template: `
    <div class="min-h-screen bg-[#FFF8F2] flex flex-col font-sans selection:bg-[#526E48] selection:text-white">
      <!-- SUPER ADMIN TOP CONTROL BAR -->
      <app-super-admin-bar></app-super-admin-bar>

      <!-- DESKTOP EDITORIAL LAYOUT (Hidden on mobile < md) -->
      <div class="hidden md:flex flex-col flex-1">
        <app-header></app-header>

        <main class="flex-1">
          <app-hero></app-hero>
          <app-menu-showcase></app-menu-showcase>
          <app-about></app-about>
          <app-reviews></app-reviews>
        </main>

        <app-footer></app-footer>
      </div>

      <!-- MOBILE NATIVE APP SHELL (Visible on mobile < md) -->
      <div class="block md:hidden flex-1">
        <app-mobile-app-shell></app-mobile-app-shell>
        <app-about></app-about>
        <app-footer></app-footer>
      </div>

      <!-- SHARED INTERACTIVE MODALS & DRAWER -->
      <app-cart-drawer></app-cart-drawer>
      <app-reservation-modal></app-reservation-modal>
      <app-story-modal></app-story-modal>
      <app-auth-modal></app-auth-modal>
      <app-user-profile-modal></app-user-profile-modal>
      <app-live-section-editor-modal></app-live-section-editor-modal>
      <app-toast></app-toast>

      <!-- MOBILE FIXED BOTTOM TAB BAR -->
      <app-mobile-bottom-nav></app-mobile-bottom-nav>
    </div>
  `
})
export class CustomerShellComponent {}
