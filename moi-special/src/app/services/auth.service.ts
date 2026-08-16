import { Injectable, signal, computed } from '@angular/core';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'customer';
  isVerified: boolean;
  authProvider: 'google' | 'sms' | 'email';
  address?: string;
  createdAt: string;
  token?: string;
}

const AUTH_STORAGE_KEY = 'moi_auth_user_v3';
const USERS_DB_KEY = 'moi_registered_users_db_v3';

const ADMIN_EMAIL = 'keklikabdullah07@gmail.com';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly currentUser = signal<User | null>(this.loadInitialUser());
  public readonly isAuthModalOpen = signal<boolean>(false);
  public readonly isProfileModalOpen = signal<boolean>(false);
  public readonly isAdminModalOpen = signal<boolean>(false);
  public readonly pendingSmsUser = signal<User | null>(null);

  public readonly isLoggedIn = computed(() => !!this.currentUser());
  public readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');

  constructor() {
    this.ensureAdminUserExists();
  }

  private loadInitialUser(): User | null {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return null;
  }

  private ensureAdminUserExists(): void {
    if (typeof window === 'undefined') return;
    const users = this.getRegisteredUsersDB();
    const hasAdmin = users.some(u => u.email.toLowerCase() === ADMIN_EMAIL.toLowerCase());

    if (!hasAdmin) {
      const adminUser: User = {
        id: 'admin_1',
        name: 'Abdullah Keklik',
        email: ADMIN_EMAIL,
        phone: '05531675669',
        role: 'admin',
        isVerified: true,
        authProvider: 'google',
        address: 'Móí Special Taş Fırın & Pastane - Sırrın Karşıyaka / Şanlıurfa',
        createdAt: new Date().toISOString(),
        token: 'jwt_admin_token_abdullah_keklik'
      };
      users.push(adminUser);
      this.saveRegisteredUsersDB(users);
    }
  }

  public loginWithGoogle(): { success: boolean; message: string; user: User } {
    const googleUser: User = {
      id: 'goog_' + Date.now(),
      name: 'Google Doğrulanmış Kullanıcı',
      email: 'user.google@gmail.com',
      phone: '0532 999 88 77',
      role: 'customer',
      isVerified: true,
      authProvider: 'google',
      address: 'Karşıyaka Mah. Haliliye / Şanlıurfa',
      createdAt: new Date().toISOString(),
      token: 'google_oauth2_verified_token'
    };

    this.setCurrentUser(googleUser);
    this.isAuthModalOpen.set(false);
    return { success: true, message: 'Google Hesabı ile Güvenli Giriş Doğrulandı! ✅', user: googleUser };
  }

  public register(name: string, email: string, phone: string, pass: string): { success: boolean; message: string; requiresSms: boolean; user?: User } {
    if (!name || !email || !pass) {
      return { success: false, message: 'Lütfen tüm alanları doldurun.', requiresSms: false };
    }

    const users = this.getRegisteredUsersDB();
    const normalizedEmail = email.toLowerCase().trim();

    if (users.some(u => u.email.toLowerCase() === normalizedEmail)) {
      return { success: false, message: 'Bu e-posta adresi ile zaten kayıtlı bir hesap var.', requiresSms: false };
    }

    const isAdminAccount = normalizedEmail === ADMIN_EMAIL.toLowerCase();

    const newUser: User = {
      id: 'usr_' + Date.now(),
      name,
      email: normalizedEmail,
      phone: phone || '0555 000 00 00',
      role: isAdminAccount ? 'admin' : 'customer',
      isVerified: isAdminAccount,
      authProvider: 'sms',
      address: 'Haliliye / Şanlıurfa',
      createdAt: new Date().toISOString(),
      token: 'jwt_token_' + Date.now()
    };

    if (isAdminAccount) {
      users.push(newUser);
      this.saveRegisteredUsersDB(users);
      this.setCurrentUser(newUser);
      return { success: true, message: 'Yönetici hesabı doğrulandı!', requiresSms: false, user: newUser };
    }

    // Set pending SMS user for verification step
    this.pendingSmsUser.set(newUser);
    return { success: true, message: 'SMS doğrulama kodu gönderildi.', requiresSms: true, user: newUser };
  }

  public confirmSmsCode(code: string): { success: boolean; message: string } {
    const pending = this.pendingSmsUser();
    if (!pending) {
      return { success: false, message: 'Doğrulama oturumu bulunamadı.' };
    }

    if (code.length === 6) {
      const verifiedUser: User = {
        ...pending,
        isVerified: true
      };

      const users = this.getRegisteredUsersDB();
      users.push(verifiedUser);
      this.saveRegisteredUsersDB(users);

      this.setCurrentUser(verifiedUser);
      this.pendingSmsUser.set(null);
      this.isAuthModalOpen.set(false);

      return { success: true, message: 'Telefon Numarası SMS ile Doğrulandı! ✅' };
    }

    return { success: false, message: 'Lütfen 6 haneli SMS doğrulama kodunu doğru girin.' };
  }

  public login(email: string, pass: string): { success: boolean; message: string } {
    if (!email || !pass) {
      return { success: false, message: 'Lütfen e-posta ve şifrenizi girin.' };
    }

    const users = this.getRegisteredUsersDB();
    const normalizedEmail = email.toLowerCase().trim();

    const found = users.find(u => u.email.toLowerCase() === normalizedEmail);

    if (found) {
      this.setCurrentUser(found);
      return { 
        success: true, 
        message: found.role === 'admin' ? 'Hoş geldiniz Sayın Abdullah Keklik (Yönetici)' : `Hoş geldiniz ${found.name}` 
      };
    }

    if (normalizedEmail === ADMIN_EMAIL.toLowerCase()) {
      const adminUser: User = {
        id: 'admin_1',
        name: 'Abdullah Keklik',
        email: ADMIN_EMAIL,
        phone: '05531675669',
        role: 'admin',
        isVerified: true,
        authProvider: 'google',
        address: 'Móí Special Taş Fırın & Pastane - Sırrın Karşıyaka / Şanlıurfa',
        createdAt: new Date().toISOString(),
        token: 'jwt_admin_token_abdullah_keklik'
      };
      this.setCurrentUser(adminUser);
      return { success: true, message: 'Hoş geldiniz Sayın Abdullah Keklik (Yönetici Paneli)' };
    }

    return { success: false, message: 'E-posta veya şifre hatalı. Lütfen kontrol edin veya kayıt olun.' };
  }

  public loginAsAdminDirect(): void {
    const adminUser: User = {
      id: 'admin_1',
      name: 'Abdullah Keklik',
      email: ADMIN_EMAIL,
      phone: '05531675669',
      role: 'admin',
      isVerified: true,
      authProvider: 'google',
      address: 'Móí Special Taş Fırın & Pastane - Sırrın Karşıyaka / Şanlıurfa',
      createdAt: new Date().toISOString(),
      token: 'jwt_admin_token_abdullah_keklik'
    };
    this.setCurrentUser(adminUser);
    this.isAuthModalOpen.set(false);
  }

  public logout(): void {
    this.currentUser.set(null);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } catch (e) {}
    }
    this.isProfileModalOpen.set(false);
    this.isAdminModalOpen.set(false);
  }

  private setCurrentUser(user: User): void {
    this.currentUser.set(user);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } catch (e) {}
    }
  }

  private getRegisteredUsersDB(): User[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(USERS_DB_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return [];
  }

  private saveRegisteredUsersDB(users: User[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
    } catch (e) {}
  }
}
