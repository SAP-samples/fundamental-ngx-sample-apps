import { Injectable, signal, effect, inject } from '@angular/core';
import { ThemingService as FdThemingService } from '@fundamental-ngx/core/theming';

export type ThemeType = 'sap_horizon' | 'sap_horizon_dark' | 'sap_horizon_hcb' | 'sap_horizon_hcw';
export type ContentDensity = 'compact' | 'cozy';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private fdThemingService = inject(FdThemingService);
  private currentTheme = signal<ThemeType>('sap_horizon');
  private currentDensity = signal<ContentDensity>('cozy');

  readonly theme = this.currentTheme.asReadonly();
  readonly density = this.currentDensity.asReadonly();

  constructor() {
    // Load saved preferences
    let savedTheme = localStorage.getItem('app-theme');
    let savedDensity = localStorage.getItem('app-density');

    // Clean up any legacy theme values
    if (savedTheme) {
      // Handle legacy values like 'high contrast', 'sap_fiori_3_hc_black', etc.
      const legacyMapping: Record<string, ThemeType> = {
        'high contrast': 'sap_horizon_hcb',
        'sap_fiori_3_hc_black': 'sap_horizon_hcb',
        'sap_fiori_3_hc_white': 'sap_horizon_hcw',
        'sap_fiori_3': 'sap_horizon',
        'sap_fiori_3_dark': 'sap_horizon_dark'
      };

      if (legacyMapping[savedTheme]) {
        savedTheme = legacyMapping[savedTheme];
        localStorage.setItem('app-theme', savedTheme);
      }
    }

    // Validate saved theme - if invalid, reset to default
    const validThemes: ThemeType[] = ['sap_horizon', 'sap_horizon_dark', 'sap_horizon_hcb', 'sap_horizon_hcw'];
    if (savedTheme && validThemes.includes(savedTheme as ThemeType)) {
      this.currentTheme.set(savedTheme as ThemeType);
    } else {
      // Reset to default if invalid
      this.currentTheme.set('sap_horizon');
      localStorage.setItem('app-theme', 'sap_horizon');
    }

    if (savedDensity && (savedDensity === 'compact' || savedDensity === 'cozy')) {
      this.currentDensity.set(savedDensity);
    } else {
      this.currentDensity.set('cozy');
      localStorage.setItem('app-density', 'cozy');
    }

    // Apply theme on init and when it changes
    effect(() => {
      const theme = this.currentTheme();
      this.applyTheme(theme);
    });

    // Apply density on init and when it changes
    effect(() => {
      const density = this.currentDensity();
      this.applyDensity(density);
    });
  }

  setTheme(theme: ThemeType): void {
    this.currentTheme.set(theme);
    localStorage.setItem('app-theme', theme);
  }

  setDensity(density: ContentDensity): void {
    this.currentDensity.set(density);
    localStorage.setItem('app-density', density);
  }

  resetToDefaults(): void {
    this.currentTheme.set('sap_horizon');
    this.currentDensity.set('cozy');
    localStorage.setItem('app-theme', 'sap_horizon');
    localStorage.setItem('app-density', 'cozy');
  }

  private applyTheme(theme: ThemeType): void {
    // Use Fundamental NGX theming service to apply the theme
    this.fdThemingService.setTheme(theme);
  }

  private applyDensity(density: ContentDensity): void {
    // Remove density classes
    document.body.classList.remove('fd-compact', 'fd-cozy');

    // Add current density class
    document.body.classList.add(`fd-${density}`);

    // Also set on html element for global scope
    document.documentElement.classList.remove('fd-compact', 'fd-cozy');
    document.documentElement.classList.add(`fd-${density}`);
  }
}
