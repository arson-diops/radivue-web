import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VersionService {
  getVersion(): string {
    return environment.version || '1.0.0';
  }

  getBuildDate(): Date {
    return new Date(environment.buildDate || Date.now());
  }

  getFullVersionInfo(): { version: string; buildDate: Date } {
    return {
      version: this.getVersion(),
      buildDate: this.getBuildDate(),
    };
  }
}
