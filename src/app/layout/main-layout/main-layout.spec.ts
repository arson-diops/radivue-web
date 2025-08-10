import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PLATFORM_ID } from '@angular/core';
import { MainLayoutComponent } from './main-layout';
import { ThemeService } from '../../core/services/theme';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutComponent, RouterTestingModule],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }, ThemeService],
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidebar collapsed state', () => {
    const initialState = component.sidebarCollapsed();
    component.toggleSidebar();
    expect(component.sidebarCollapsed()).toBe(!initialState);
    component.toggleSidebar();
    expect(component.sidebarCollapsed()).toBe(initialState);
  });

  it('should handle logout without throwing', () => {
    expect(() => component.logout()).not.toThrow();
  });

  it('should have correct initial signals', () => {
    expect(component.highPriorityAlerts()).toBe(3);
    expect(component.mediumPriorityAlerts()).toBe(7);
    expect(component.systemStatus()).toBe('online');
    expect(component.lastUpdated()).toBeInstanceOf(Date);
  });

  it('should update lastUpdated signal', () => {
    const oldDate = component.lastUpdated();
    const newDate = new Date(Date.now() + 1000);
    component.lastUpdated.set(newDate);
    expect(component.lastUpdated()).toBe(newDate);
    expect(component.lastUpdated()).not.toBe(oldDate);
  });

  it('should interact with ThemeService', () => {
    spyOn(themeService, 'setTheme').and.callThrough();
    themeService.setTheme('dark');
    expect(themeService.setTheme).toHaveBeenCalledWith('dark');
    expect(['light', 'dark', 'auto']).toContain(themeService.theme());
  });

  it('should log initialization with theme', () => {
    const logSpy = spyOn(console, 'log');
    // Re-create component to trigger constructor
    const testFixture = TestBed.createComponent(MainLayoutComponent);
    testFixture.detectChanges();
    expect(logSpy).toHaveBeenCalledWith(
      jasmine.stringMatching(
        /MainLayoutComponent initialized, theme service active:/
      ),
      jasmine.any(String)
    );
  });
});
