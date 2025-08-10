import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, Theme } from '../../../core/services/theme';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
})
export class ThemeToggleComponent {
  @Input() compact = false;

  protected readonly themeOptions = [
    { value: 'light' as Theme, label: 'Light', icon: 'icon-sun' },
    { value: 'dark' as Theme, label: 'Dark', icon: 'icon-moon' },
    { value: 'auto' as Theme, label: 'Auto', icon: 'icon-monitor' },
  ];

  protected themeService = inject(ThemeService);

  selectTheme(theme: Theme): void {
    console.log('ThemeToggleComponent: selectTheme called with:', theme);
    this.themeService.setTheme(theme);
  }
}
