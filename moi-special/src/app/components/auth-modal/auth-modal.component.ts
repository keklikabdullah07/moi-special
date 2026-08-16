import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (authService.isAuthModalOpen()) {
      <!-- Backdrop Overlay -->
      <div 
        (click)="authService.isAuthModalOpen.set(false)"
        class="fixed inset-0 z-50 bg-[#1F1B14]/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
        
        <!-- Modal Card Container -->
        <div 
          (click)="$event.stopPropagation()"
          class="relative w-full max-w-md bg-[#FFF8F2] border border-[#D6C9B6] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar">
          
          <!-- Background Ambient Blob -->
          <div class="absolute -top-12 -right-12 w-40 h-40 bg-[#CFEFC0]/40 rounded-full blur-2xl pointer-events-none"></div>

          <!-- Header & Close -->
          <div class="flex items-center justify-between">
            <div class="space-y-1">
              <span class="label-caps text-[9px] text-[#B87333]">Móí Special Doğrulanmış Üyelik</span>
              <h3 class="font-serif text-2xl font-bold text-[#1F1B14]">
                @if (isSmsVerificationStep()) {
                  SMS Telefon Doğrulama
                } @else if (mode() === 'login') {
                  Giriş Yapın
                } @else {
                  Üyeliğinizi Oluşturun
                }
              </h3>
            </div>
            
            <button 
              (click)="authService.isAuthModalOpen.set(false)"
              class="w-9 h-9 rounded-full bg-[#EDE4D8] text-[#1F1B14] hover:bg-[#D6C9B6] flex items-center justify-center transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- SMS STEP MODE -->
          @if (isSmsVerificationStep()) {
            <div class="space-y-5 animate-fadeIn">
              
              <!-- SIMULATED REAL SMS DISPATCH NOTIFICATION CARD -->
              <div class="p-4 rounded-2xl bg-[#526E48]/15 border-2 border-[#526E48]/40 space-y-3 shadow-sm text-left relative overflow-hidden">
                <div class="flex items-center justify-between text-xs text-[#526E48] font-bold">
                  <span class="flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                    <span>💬 SMS GATEWAY • Netgsm Dispatch</span>
                  </span>
                  <span class="text-[10px] text-[#434840]">Şimdi</span>
                </div>

                <p class="text-xs text-[#1F1B14] font-medium leading-relaxed bg-white/80 p-3 rounded-xl border border-[#D6C9B6]">
                  "Sayın <strong class="text-[#B87333]">{{ regName }}</strong>, Móí Special Taş Fırın & Pastane üyelik doğrulama şifreniz: 
                  <span class="text-base font-serif font-black text-[#526E48] tracking-widest bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-400 select-all">{{ currentOtpCode() }}</span>
                  Lütfen kimseyle paylaşmayın."
                </p>

                <div class="flex items-center justify-between pt-1">
                  <span class="text-[10px] text-[#434840]">Alıcı: {{ smsPhone() }}</span>
                  <button 
                    (click)="autoFillOtp()" 
                    class="text-[10px] font-bold text-[#B87333] hover:text-[#784000] underline cursor-pointer">
                    ⚡ Kodu Otomatik Doldur
                  </button>
                </div>
              </div>

              <div class="space-y-1 text-left">
                <label class="label-caps text-[10px] text-[#434840]">6 Haneli SMS Onay Kodu</label>
                <input 
                  type="text" 
                  [(ngModel)]="smsCode" 
                  maxlength="6"
                  placeholder="6 Haneli Kodu Girin"
                  class="w-full px-4 py-3.5 rounded-2xl bg-[#EDE4D8]/50 border-2 border-[#526E48] text-center text-xl font-serif font-bold tracking-widest text-[#1F1B14] focus:outline-none focus:bg-white transition-all shadow-inner" />
              </div>

              <button 
                (click)="onConfirmSmsSubmit()"
                class="w-full py-3.5 rounded-full bg-[#526E48] hover:bg-[#3B5532] text-white text-xs font-bold uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer">
                SMS Kodunu Onayla & Üyeliği Aktif Et
              </button>

              <button 
                (click)="isSmsVerificationStep.set(false)"
                class="w-full text-center text-xs text-[#434840] hover:text-[#1F1B14] underline font-medium">
                ← Geri Dön
              </button>
            </div>
          } @else {
            <!-- GOOGLE VERIFIED QUICK ONE-TAP LOGIN BUTTON -->
            <button 
              (click)="loginGoogleVerified()"
              class="w-full py-3 px-4 rounded-2xl bg-white border border-[#D6C9B6] hover:bg-[#EDE4D8]/50 text-xs font-bold text-[#1F1B14] flex items-center justify-center gap-3 shadow-xs active:scale-95 transition-all cursor-pointer">
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"/>
              </svg>
              <span>Google İle Doğrulanmış Giriş Yap</span>
            </button>

            <div class="flex items-center gap-3">
              <span class="h-[1px] flex-1 bg-[#D6C9B6]/60"></span>
              <span class="label-caps text-[9px] text-[#434840]">Veya E-Posta / SMS İle</span>
              <span class="h-[1px] flex-1 bg-[#D6C9B6]/60"></span>
            </div>

            <!-- Segmented Tab Switcher (Giriş Yap / Kayıt Ol) -->
            <div class="flex p-1 rounded-full bg-[#EDE4D8] border border-[#D6C9B6]">
              <button 
                (click)="mode.set('login'); errorMessage.set('')"
                [class.bg-[#526E48]]="mode() === 'login'"
                [class.text-white]="mode() === 'login'"
                [class.text-[#1F1B14]]="mode() !== 'login'"
                class="flex-1 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer">
                Giriş Yap
              </button>
              <button 
                (click)="mode.set('register'); errorMessage.set('')"
                [class.bg-[#526E48]]="mode() === 'register'"
                [class.text-white]="mode() === 'register'"
                [class.text-[#1F1B14]]="mode() !== 'register'"
                class="flex-1 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer">
                Üye Ol (SMS Onaylı)
              </button>
            </div>

            <!-- Error Feedback Alert -->
            @if (errorMessage()) {
              <div class="p-3 rounded-2xl bg-red-100 border border-red-300 text-red-700 text-xs font-medium animate-fadeIn">
                {{ errorMessage() }}
              </div>
            }

            <!-- Form Body -->
            @if (mode() === 'login') {
              <form (ngSubmit)="onLoginSubmit()" class="space-y-4 text-left">
                <div class="space-y-1">
                  <label class="label-caps text-[10px] text-[#434840]">E-Posta Adresi</label>
                  <input 
                    type="email" 
                    [(ngModel)]="loginEmail" 
                    name="loginEmail" 
                    placeholder="ornek@domain.com"
                    required
                    class="w-full px-4 py-3 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs text-[#1F1B14] focus:outline-none focus:border-[#526E48]" />
                </div>

                <div class="space-y-1">
                  <label class="label-caps text-[10px] text-[#434840]">Şifre</label>
                  <input 
                    type="password" 
                    [(ngModel)]="loginPass" 
                    name="loginPass" 
                    placeholder="••••••••"
                    required
                    class="w-full px-4 py-3 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs text-[#1F1B14] focus:outline-none focus:border-[#526E48]" />
                </div>

                <button 
                  type="submit"
                  class="w-full py-3.5 rounded-full bg-[#526E48] hover:bg-[#3B5532] text-white text-xs font-bold uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer">
                  Hesaba Giriş Yap
                </button>
              </form>
            } @else {
              <form (ngSubmit)="onRegisterSubmit()" class="space-y-4 text-left">
                <div class="space-y-1">
                  <label class="label-caps text-[10px] text-[#434840]">Ad Soyad</label>
                  <input 
                    type="text" 
                    [(ngModel)]="regName" 
                    name="regName" 
                    placeholder="Örn: Ahmet Yılmaz"
                    required
                    class="w-full px-4 py-3 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs text-[#1F1B14] focus:outline-none focus:border-[#526E48]" />
                </div>

                <div class="space-y-1">
                  <label class="label-caps text-[10px] text-[#434840]">E-Posta Adresi</label>
                  <input 
                    type="email" 
                    [(ngModel)]="regEmail" 
                    name="regEmail" 
                    placeholder="ornek@domain.com"
                    required
                    class="w-full px-4 py-3 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs text-[#1F1B14] focus:outline-none focus:border-[#526E48]" />
                </div>

                <div class="space-y-1">
                  <label class="label-caps text-[10px] text-[#434840]">Telefon Numarası (SMS Onayı)</label>
                  <input 
                    type="tel" 
                    [(ngModel)]="regPhone" 
                    name="regPhone" 
                    placeholder="05XX XXX XX XX"
                    required
                    class="w-full px-4 py-3 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs text-[#1F1B14] focus:outline-none focus:border-[#526E48]" />
                </div>

                <div class="space-y-1">
                  <label class="label-caps text-[10px] text-[#434840]">Şifre Oluşturun</label>
                  <input 
                    type="password" 
                    [(ngModel)]="regPass" 
                    name="regPass" 
                    placeholder="••••••••"
                    required
                    class="w-full px-4 py-3 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs text-[#1F1B14] focus:outline-none focus:border-[#526E48]" />
                </div>

                <button 
                  type="submit"
                  class="w-full py-3.5 rounded-full bg-[#526E48] hover:bg-[#3B5532] text-white text-xs font-bold uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer">
                  SMS Kodu Gönder & Üye Ol
                </button>
              </form>
            }
          }

        </div>

      </div>
    }
  `
})
export class AuthModalComponent {
  public readonly authService = inject(AuthService);
  public readonly toastService = inject(ToastService);

  public readonly mode = signal<'login' | 'register'>('login');
  public readonly isSmsVerificationStep = signal<boolean>(false);
  public readonly smsPhone = signal<string>('');
  public readonly currentOtpCode = signal<string>('');
  public readonly errorMessage = signal<string>('');

  public loginEmail = '';
  public loginPass = '';

  public regName = '';
  public regEmail = '';
  public regPhone = '';
  public regPass = '';

  public smsCode = '';

  public loginGoogleVerified(): void {
    const res = this.authService.loginWithGoogle();
    this.toastService.show(res.message);
  }

  public onLoginSubmit(): void {
    this.errorMessage.set('');
    const res = this.authService.login(this.loginEmail, this.loginPass);

    if (res.success) {
      this.toastService.show(res.message);
      this.authService.isAuthModalOpen.set(false);
    } else {
      this.errorMessage.set(res.message);
    }
  }

  public onRegisterSubmit(): void {
    this.errorMessage.set('');
    const res = this.authService.register(this.regName, this.regEmail, this.regPhone, this.regPass);

    if (res.success) {
      if (res.requiresSms && res.otpCode) {
        this.smsPhone.set(this.regPhone || '05XX XXX XX XX');
        this.currentOtpCode.set(res.otpCode);
        this.isSmsVerificationStep.set(true);
        this.smsCode = res.otpCode;
        this.toastService.show(`💬 [MÓÍ-SMS] Kodunuz: ${res.otpCode} (${this.regPhone} alıcısına gönderildi)`);
      } else {
        this.toastService.show(res.message);
        this.authService.isAuthModalOpen.set(false);
      }
    } else {
      this.errorMessage.set(res.message);
    }
  }

  public autoFillOtp(): void {
    this.smsCode = this.currentOtpCode();
  }

  public onConfirmSmsSubmit(): void {
    const res = this.authService.confirmSmsCode(this.smsCode);
    if (res.success) {
      this.toastService.show(res.message);
      this.isSmsVerificationStep.set(false);
    } else {
      this.errorMessage.set(res.message);
    }
  }
}
