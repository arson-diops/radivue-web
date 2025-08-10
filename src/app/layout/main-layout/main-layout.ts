import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';
import { ThemeService } from '../../core/services/theme'; // Add this import

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayoutComponent {
  // Inject ThemeService to ensure it's accessible in templates
  protected themeService = inject(ThemeService); // Add this line

  // Existing signals
  public readonly sidebarCollapsed = signal(false);
  public readonly highPriorityAlerts = signal(3);
  public readonly mediumPriorityAlerts = signal(7);
  public readonly lastUpdated = signal<Date>(new Date());
  public readonly systemStatus = signal<'online' | 'offline'>('online');

  constructor() {
    console.log(
      'MainLayoutComponent initialized, theme service active:',
      this.themeService.theme()
    );
  }

  toggleSidebar() {
    this.sidebarCollapsed.update((collapsed) => !collapsed);
  }

  logout() {
    // Handle logout logic
    console.log('Logout triggered');
  }
}
