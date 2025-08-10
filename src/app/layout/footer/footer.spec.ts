import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer';
import { VersionService } from '../../core/services/version';
import { environment } from '../../../environments/environment';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  const mockVersionInfo = {
    version: '1.2.3',
    buildDate: new Date('2025-08-08T12:00:00Z'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [
        {
          provide: VersionService,
          useValue: {
            getFullVersionInfo: () => mockVersionInfo,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize version and buildDate signals from VersionService', () => {
    expect(component.version()).toBe(mockVersionInfo.version);
    expect(component.buildDate()).toEqual(mockVersionInfo.buildDate);
  });

  it('should set systemStatus based on environment', () => {
    const expectedStatus =
      {
        local: 'Local',
        preview: 'Preview',
        develop: 'Develop',
        staging: 'Staging',
        production: 'Production',
      }[environment.envName] ?? 'Unknown';
    expect(component.systemStatus).toBe(expectedStatus);
  });

  it('should update isOnline signal on online/offline events', () => {
    component.isOnline.set(false);
    window.dispatchEvent(new Event('online'));
    expect(component.isOnline()).toBeTrue();

    component.isOnline.set(true);
    window.dispatchEvent(new Event('offline'));
    expect(component.isOnline()).toBeFalse();
  });

  it('should accept lastUpdated input', () => {
    const date = new Date('2025-08-08T15:00:00Z');
    component.lastUpdated = date;
    fixture.detectChanges();
    expect(component.lastUpdated).toBe(date);
  });
});
