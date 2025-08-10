/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { ThemeService, Theme } from './theme';

describe('ThemeService', () => {
  let localStorageMock: Record<string, string>;

  beforeEach(() => {
    // Mock localStorage
    localStorageMock = {};
    spyOn(window.localStorage, 'getItem').and.callFake(
      (key: string) => localStorageMock[key] ?? null
    );
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key: string, value: string) => {
        localStorageMock[key] = value;
      }
    );

    // Mock DOM methods
    spyOn(document.documentElement, 'setAttribute');
    spyOn(document.body, 'setAttribute');
    spyOn(document, 'querySelector').and.callFake((selector: string) => {
      if (selector === 'app-main-layout') return document.createElement('div');
      if (selector === 'meta[name="theme-color"]')
        return document.createElement('meta');
      return null;
    });

    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(ThemeService);
    expect(service).toBeTruthy();
  });

  it('should initialize theme from localStorage', () => {
    localStorageMock['radivue-theme'] = 'dark';
    const service = TestBed.inject(ThemeService);
    expect(service.theme()).toBe('dark');
  });

  it('should set and persist theme', () => {
    const service = TestBed.inject(ThemeService);
    service.setTheme('light');
    expect(service.theme()).toBe('light');
    expect(localStorageMock['radivue-theme']).toBe('light');
  });

  it('should toggle theme between light and dark', () => {
    const service = TestBed.inject(ThemeService);
    service.setTheme('light');
    service.toggleTheme();
    expect(service.theme()).toBe('dark');
    service.toggleTheme();
    expect(service.theme()).toBe('light');
  });

  // it('should apply theme to DOM', () => {
  //   // Reset spies before service instantiation
  //   const setAttributeSpyHtml = document.documentElement
  //     .setAttribute as jasmine.Spy;
  //   setAttributeSpyHtml.calls.reset();
  //   const setAttributeSpyBody = document.body.setAttribute as jasmine.Spy;
  //   setAttributeSpyBody.calls.reset();

  //   const service = TestBed.inject(ThemeService);
  //   service.setTheme('dark'); // This should trigger DOM updates

  //   expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
  //     'data-theme',
  //     'dark',
  //   );
  //   expect(document.body.setAttribute).toHaveBeenCalledWith(
  //     'data-theme',
  //     'dark',
  //   );
  // });

  // it('should detect system theme as dark', () => {
  //   spyOn(window, 'matchMedia').and.callFake(
  //     (query: string) =>
  //       ({
  //         matches: true,
  //         addEventListener: () => {},
  //         removeEventListener: () => {},
  //       }) as unknown as MediaQueryList,
  //   );
  //   // Re-inject service after mocking matchMedia
  //   const service = TestBed.inject(ThemeService);
  //   service.setTheme('auto');
  //   expect(service.effectiveTheme()).toBe('dark');
  // });

  // it('should report isDark, isLight, isAuto correctly', () => {
  //   const service = TestBed.inject(ThemeService);
  //   service.setTheme('dark');
  //   expect(service.isDark()).toBeTrue();
  //   expect(service.isLight()).toBeFalse();
  //   expect(service.isAuto()).toBeFalse();

  //   service.setTheme('light');
  //   expect(service.isLight()).toBeTrue();
  //   expect(service.isDark()).toBeFalse();

  //   service.setTheme('auto');
  //   expect(service.isAuto()).toBeTrue();
  // });
});
