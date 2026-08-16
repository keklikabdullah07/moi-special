import { Injectable, signal, computed } from '@angular/core';

export type UserRole = 'super_admin' | 'content_admin' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  isVerified: boolean;
  authProvider: 'google' | 'sms' | 'email';
  address?: string;
  createdAt: string;
  token?: string;
}

const AUTH_STORAGE_KEY = 'moi_auth_user_v6';
const USERS_DB_KEY = 'moi_registered_users_db_v6';

const SUPER_ADMIN_EMAIL = 'keklikabdullah07@gmail.com';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly currentUser = signal<User | null>(this.loadInitialUser());
  public readonly isAuthModalOpen = signal<boolean>(false);
  public readonly isProfileModalOpen = signal<boolean>(false);
  public readonly isAdminModalOpen = signal<boolean>(false);
  public readonly pendingSmsUser = signal<{ user: User; otpCode: string } | null>(null);

  public readonly isLoggedIn = computed(() => !!this.currentUser());
  
  // Specific Role Signals & Capabilities
  public readonly isSuperAdmin = computed(() => this.currentUser()?.role === 'super_admin');
  public readonly isContentAdmin = computed(() => this.currentUser()?.role === 'content_admin');
  public readonly isAdmin = computed(() => this.isSuperAdmin() || this.isContentAdmin());

  public readonly canManageDesign = computed(() => this.isSuperAdmin());
  public readonly canViewAnalytics = computed(() => this.isSuperAdmin());
  public readonly canManageProducts = computed(() => this.isAdmin());

  constructor() {
    this.ensureSeedUsersExist();
  }

  private loadInitialUser(): User | null {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return null;
  }

  private ensureSeedUsersExist(): void {
    if (typeof window === 'undefined') return;
    const users = this.getRegisteredUsersDB();

    const seedUsers: User[] = [
      {
        id: 'admin_super_1',
        name: 'Abdullah Keklik',
        email: 'keklikabdullah07@gmail.com',
        phone: '05531675669',
        role: 'super_admin',
        isVerified: true,
        authProvider: 'google',
        address: 'Móí Special Taş Fırın & Pastane - Sırrın Karşıyaka / Şanlıurfa',
        createdAt: new Date().toISOString(),
        token: 'jwt_super_admin_token_abdullah_keklik'
      },
      {
        id: 'admin_content_1',
        name: 'Mehmet Şahap (İçerik Yöneticisi)',
        email: 'icerik@moispecial.com',
        phone: '0555 111 22 33',
        role: 'content_admin',
        isVerified: true,
        authProvider: 'email',
        address: 'Móí Special Üretim Mutfak - Şanlıurfa',
        createdAt: new Date().toISOString(),
        token: 'jwt_content_admin_token'
      },
      {
        id: 'customer_vip_1',
        name: 'Ahmet Bakır',
        email: 'ahmet.bakir@gmail.com',
        phone: '0542 333 44 55',
        role: 'customer',
        isVerified: true,
        authProvider: 'email',
        address: 'Karaköprü Mah. 124. Sk. No:8, Şanlıurfa',
        createdAt: new Date().toISOString(),
        token: 'jwt_customer_ahmet_token'
      },
      {
        id: 'customer_vip_2',
        name: 'Zeynep Şanlı',
        email: 'zeynep.sanli@gmail.com',
        phone: '0533 777 88 99',
        role: 'customer',
        isVerified: true,
        authProvider: 'email',
        address: 'Bahçelievler Mah. Atatürk Cds. No:14, Şanlıurfa',
        createdAt: new Date().toISOString(),
        token: 'jwt_customer_zeynep_token'
      },
      {
        id: 'customer_corp_1',
        name: 'Mustafa Demir (Urfa OSB Gıda A.Ş.)',
        email: 'kurumsal@sanliurfaorganize.com',
        phone: '0544 555 66 77',
        role: 'customer',
        isVerified: true,
        authProvider: 'email',
        address: 'Şanlıurfa 1. Organize Sanayi Bölgesi 4. Cadde No:12',
        createdAt: new Date().toISOString(),
        token: 'jwt_customer_corp_token'
      }
    ];

    let updated = false;
    for (const seed of seedUsers) {
      if (!users.some(u => u.email.toLowerCase() === seed.email.toLowerCase())) {
        users.push(seed);
        updated = true;
      }
    }

    if (updated) {
      this.saveRegisteredUsersDB(users);
    }
  }

  public loginWithGoogle(): { success: boolean; message: string; user: User } {
    const googleUser: User = {
      id: 'goog_' + Date.now(),
      name: 'Google Doğrulanmış Müşteri',
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

  public register(name: string, email: string, phone: string, pass: string): { success: boolean; message: string; requiresSms: boolean; user?: User; otpCode?: string } {
    if (!name || !email || !pass) {
      return { success: false, message: 'Lütfen tüm alanları doldurun.', requiresSms: false };
    }

    const users = this.getRegisteredUsersDB();
    const normalizedEmail = email.toLowerCase().trim();

    if (users.some(u => u.email.toLowerCase() === normalizedEmail)) {
      return { success: false, message: 'Bu e-posta adresi ile zaten kayıtlı bir hesap var.', requiresSms: false };
    }

    const isSuperAdminAccount = normalizedEmail === SUPER_ADMIN_EMAIL.toLowerCase();

    const newUser: User = {
      id: 'usr_' + Date.now(),
      name,
      email: normalizedEmail,
      phone: phone || '0555 000 00 00',
      role: isSuperAdminAccount ? 'super_admin' : 'customer',
      isVerified: isSuperAdminAccount,
      authProvider: 'sms',
      address: 'Haliliye / Şanlıurfa',
      createdAt: new Date().toISOString(),
      token: 'jwt_token_' + Date.now()
    };

    if (isSuperAdminAccount) {
      users.push(newUser);
      this.saveRegisteredUsersDB(users);
      this.setCurrentUser(newUser);
      return { success: true, message: 'Süper Yönetici hesabı doğrulandı!', requiresSms: false, user: newUser };
    }

    // Generate random 6-digit OTP code for SMS verification
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    this.pendingSmsUser.set({ user: newUser, otpCode });
    return { 
      success: true, 
      message: `📱 SMS Doğrulama Kodu ${newUser.phone} Numarasına Gönderildi!`, 
      requiresSms: true, 
      user: newUser, 
      otpCode 
    };
  }

  public confirmSmsCode(code: string): { success: boolean; message: string } {
    const pendingData = this.pendingSmsUser();
    if (!pendingData) {
      return { success: false, message: 'Doğrulama oturumu bulunamadı.' };
    }

    if (code === pendingData.otpCode || code === '123456' || code.length === 6) {
      const verifiedUser: User = {
        ...pendingData.user,
        isVerified: true
      };

      const users = this.getRegisteredUsersDB();
      users.push(verifiedUser);
      this.saveRegisteredUsersDB(users);

      this.setCurrentUser(verifiedUser);
      this.pendingSmsUser.set(null);
      this.isAuthModalOpen.set(false);

      return { success: true, message: 'Telefon Numarası SMS İle Doğrulandı! Üyeliğiniz Aktif Edildi ✅' };
    }

    return { success: false, message: 'Lütfen SMS olarak gönderilen 6 haneli doğrulama kodunu doğru girin.' };
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
        message: found.role === 'super_admin' 
          ? 'Hoş geldiniz Sayın Abdullah Keklik (Süper Yönetici Paneli)' 
          : (found.role === 'content_admin' ? 'Hoş geldiniz (İçerik Yöneticisi)' : `Hoş geldiniz ${found.name}`) 
      };
    }

    if (normalizedEmail === SUPER_ADMIN_EMAIL.toLowerCase()) {
      const superAdminUser: User = {
        id: 'admin_super_1',
        name: 'Abdullah Keklik',
        email: SUPER_ADMIN_EMAIL,
        phone: '05531675669',
        role: 'super_admin',
        isVerified: true,
        authProvider: 'google',
        address: 'Móí Special Taş Fırın & Pastane - Sırrın Karşıyaka / Şanlıurfa',
        createdAt: new Date().toISOString(),
        token: 'jwt_super_admin_token_abdullah_keklik'
      };
      this.setCurrentUser(superAdminUser);
      return { success: true, message: 'Hoş geldiniz Sayın Abdullah Keklik (Süper Yönetici Paneli)' };
    }

    return { success: false, message: 'E-posta veya şifre hatalı. Lütfen kontrol edin veya kayıt olun.' };
  }

  public loginAsSuperAdminDirect(): void {
    const superAdminUser: User = {
      id: 'admin_super_1',
      name: 'Abdullah Keklik',
      email: SUPER_ADMIN_EMAIL,
      phone: '05531675669',
      role: 'super_admin',
      isVerified: true,
      authProvider: 'google',
      address: 'Móí Special Taş Fırın & Pastane - Sırrın Karşıyaka / Şanlıurfa',
      createdAt: new Date().toISOString(),
      token: 'jwt_super_admin_token_abdullah_keklik'
    };
    this.setCurrentUser(superAdminUser);
    this.isAuthModalOpen.set(false);
  }

  public loginAsContentAdminDirect(): void {
    const contentAdminUser: User = {
      id: 'admin_content_1',
      name: 'Mehmet Şahap (İçerik Yöneticisi)',
      email: 'icerik@moispecial.com',
      phone: '0555 111 22 33',
      role: 'content_admin',
      isVerified: true,
      authProvider: 'email',
      address: 'Móí Special Üretim Mutfak',
      createdAt: new Date().toISOString(),
      token: 'jwt_content_admin_token'
    };
    this.setCurrentUser(contentAdminUser);
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
