import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  ShellbarComponent,
  ShellbarBrandingComponent,
  ShellbarLogoComponent,
  ShellbarTitleComponent,
  ShellbarActionsComponent
} from '@fundamental-ngx/core/shellbar';
import {
  UserMenuComponent,
  UserMenuBodyComponent,
  UserMenuControlComponent,
  UserMenuControlElementDirective,
  UserMenuContentContainerComponent,
  UserMenuHeaderDirective,
  UserMenuHeaderContainerDirective,
  UserMenuUserNameDirective,
  UserMenuSublineDirective,
  UserMenuListComponent,
  UserMenuListItemComponent
} from '@fundamental-ngx/core/user-menu';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import {
  NavigationComponent,
  NavigationContentStartComponent,
  NavigationContentEndComponent,
  NavigationListItemComponent,
  NavigationLinkComponent,
  NavigationLinkRefDirective
} from '@fundamental-ngx/btp/navigation';
import { ThemeService, ThemeType, ContentDensity } from './services/theme';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ShellbarComponent,
    ShellbarBrandingComponent,
    ShellbarLogoComponent,
    ShellbarTitleComponent,
    ShellbarActionsComponent,
    UserMenuComponent,
    UserMenuBodyComponent,
    UserMenuControlComponent,
    UserMenuControlElementDirective,
    UserMenuContentContainerComponent,
    UserMenuHeaderDirective,
    UserMenuHeaderContainerDirective,
    UserMenuUserNameDirective,
    UserMenuSublineDirective,
    UserMenuListComponent,
    UserMenuListItemComponent,
    AvatarComponent,
    NavigationComponent,
    NavigationContentStartComponent,
    NavigationContentEndComponent,
    NavigationListItemComponent,
    NavigationLinkComponent,
    NavigationLinkRefDirective
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly userName = signal('John Smith');
  protected readonly navigationState = signal<'expanded' | 'snapped' | 'popup'>('expanded');
  protected readonly navigationMode = signal<'' | 'tablet' | 'phone'>('');

  protected readonly themes: Array<{ value: ThemeType; label: string }> = [
    { value: 'sap_horizon', label: 'Horizon Light' },
    { value: 'sap_horizon_dark', label: 'Horizon Dark' },
    { value: 'sap_horizon_hcb', label: 'High Contrast Black' },
    { value: 'sap_horizon_hcw', label: 'High Contrast White' }
  ];

  protected readonly densities: Array<{ value: ContentDensity; label: string }> = [
    { value: 'cozy', label: 'Cozy' },
    { value: 'compact', label: 'Compact' }
  ];

  protected themeService = inject(ThemeService);

  setTheme(theme: ThemeType): void {
    this.themeService.setTheme(theme);
  }

  setDensity(density: ContentDensity): void {
    this.themeService.setDensity(density);
  }

  resetTheme(): void {
    this.themeService.resetToDefaults();
  }
}
