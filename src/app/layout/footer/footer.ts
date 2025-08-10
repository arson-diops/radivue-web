import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VersionService } from '../../core/services/version';
import { environment } from '../../../environments/environment';

const ENV_STATUS_MAP: Record<string, string> = {
  local: 'Local',
  preview: 'Preview',
  develop: 'Develop',
  staging: 'Staging',
  production: 'Production',
};

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent implements OnInit {
  @Input() lastUpdated: Date = new Date();
  @Input() systemStatus = ENV_STATUS_MAP[environment.envName] ?? 'Unknown';

  public readonly version = signal<string>('');
  public readonly buildDate = signal<Date>(new Date());
  public readonly isOnline = signal<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);

  private readonly versionService = inject(VersionService);

  ngOnInit() {
    const versionInfo = this.versionService.getFullVersionInfo();
    this.version.set(versionInfo.version);
    this.buildDate.set(versionInfo.buildDate);

    // Set systemStatus based on environment
    this.systemStatus = ENV_STATUS_MAP[environment.envName] ?? 'Unknown';

    // Listen for online/offline events only in browser
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.isOnline.set(true));
      window.addEventListener('offline', () => this.isOnline.set(false));
    }
  }
}
