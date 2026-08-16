import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { MenuShowcaseComponent } from './components/menu-showcase/menu-showcase.component';
import { AboutComponent } from './components/about/about.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer.component';
import { MobileBottomNavComponent } from './components/mobile-bottom-nav/mobile-bottom-nav.component';
import { MobileAppShellComponent } from './components/mobile-app-shell/mobile-app-shell.component';
import { ReservationModalComponent } from './components/reservation-modal/reservation-modal.component';
import { StoryModalComponent } from './components/story-modal/story-modal.component';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { UserProfileModalComponent } from './components/user-profile-modal/user-profile-modal.component';
import { SuperAdminBarComponent } from './components/super-admin-bar/super-admin-bar.component';
import { LiveSectionEditorModalComponent } from './components/live-section-editor-modal/live-section-editor-modal.component';
import { ToastComponent } from './components/toast/toast.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
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
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
