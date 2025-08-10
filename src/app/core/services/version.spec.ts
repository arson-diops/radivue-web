import { TestBed } from '@angular/core/testing';
import { VersionService } from './version';

describe('VersionService', () => {
  let service: VersionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VersionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return version from service', () => {
    const version = service.getVersion();
    expect(typeof version).toBe('string');
    expect(version.length).toBeGreaterThan(0);
  });

  it('should return build date from service', () => {
    const buildDate = service.getBuildDate();
    expect(buildDate).toBeInstanceOf(Date);
  });

  it('should return full version info with correct structure', () => {
    const versionInfo = service.getFullVersionInfo();
    expect(versionInfo.version).toBeDefined();
    expect(versionInfo.buildDate).toBeDefined();
    expect(typeof versionInfo.version).toBe('string');
    expect(versionInfo.buildDate).toBeInstanceOf(Date);
  });
});
