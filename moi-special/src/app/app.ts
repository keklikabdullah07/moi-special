import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { MenuShowcaseComponent } from './components/menu-showcase/menu-showcase.component';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer.component';
import { MobileBottomNavComponent } from './components/mobile-bottom-nav/mobile-bottom-nav.component';
import { MobileAppShellComponent } from './components/mobile-app-shell/mobile-app-shell.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    MenuShowcaseComponent,
    CartDrawerComponent,
    MobileBottomNavComponent,
    MobileAppShellComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
