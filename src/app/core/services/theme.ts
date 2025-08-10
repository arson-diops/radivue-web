import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark' | 'auto';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'radivue-theme';
  private readonly currentTheme = signal<Theme>('auto');
  private readonly systemTheme = signal<'light' | 'dark'>('light');

  // Public readonly signals
  readonly theme = this.currentTheme.asReadonly();
  readonly effectiveTheme = signal<'light' | 'dark'>('light');

  private readonly platformId: object = inject(PLATFORM_ID);

  constructor() {
    console.log('ThemeService initialized');

    // Initialize theme from storage or default
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();
      this.setupSystemThemeListener();
    }

    // Update effective theme when theme or system theme changes
    effect(() => {
      const theme = this.currentTheme();
      const system = this.systemTheme();

      console.log('Theme effect triggered:', { theme, system });

      if (theme === 'auto') {
        this.effectiveTheme.set(system);
      } else {
        this.effectiveTheme.set(theme);
      }

      this.applyTheme(this.effectiveTheme());
    });
  }

  private initializeTheme(): void {
    const stored = localStorage.getItem(this.storageKey) as Theme;
    console.log('Stored theme:', stored);

    if (stored && ['light', 'dark', 'auto'].includes(stored)) {
      this.currentTheme.set(stored);
    }

    // Detect initial system theme
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    this.systemTheme.set(prefersDark ? 'dark' : 'light');
    console.log('System theme:', prefersDark ? 'dark' : 'light');
  }

  private setupSystemThemeListener(): void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      console.log('System theme changed:', e.matches ? 'dark' : 'light');
      this.systemTheme.set(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    console.log('Applying theme:', theme);

    if (isPlatformBrowser(this.platformId)) {
      // Apply to document root
      document.documentElement.setAttribute('data-theme', theme);

      // Apply to body
      document.body.setAttribute('data-theme', theme);

      // Apply to the main layout component
      const mainLayout = document.querySelector('app-main-layout');
      if (mainLayout) {
        mainLayout.setAttribute('data-theme', theme);
      }

      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute(
          'content',
          theme === 'dark' ? '#000000' : '#ffffff',
        );
      }

      console.log('Theme applied:', theme);
    }
  }

  setTheme(theme: Theme): void {
    console.log('Setting theme to:', theme);
    this.currentTheme.set(theme);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, theme);
    }
  }

  toggleTheme(): void {
    const current = this.currentTheme();
    const next = current === 'light' ? 'dark' : 'light';
    this.setTheme(next);
  }

  // Utility methods for components
  isDark(): boolean {
    return this.effectiveTheme() === 'dark';
  }

  isLight(): boolean {
    return this.effectiveTheme() === 'light';
  }

  isAuto(): boolean {
    return this.currentTheme() === 'auto';
  }
}
