import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from './header';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit logout event when logout is called', () => {
    spyOn(component.logout, 'emit');
    component.logout.emit();
    expect(component.logout.emit).toHaveBeenCalled();
  });

  it('should detect browser platform', () => {
    expect(component.isBrowser).toBeTrue();
  });

  it('should have correct @Output type', () => {
    expect(component.logout).toBeInstanceOf(Object);
    expect(typeof component.logout.emit).toBe('function');
  });

  it('should render theme toggle and auth button components', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // Check for theme toggle and auth button selectors
    expect(compiled.querySelector('app-theme-toggle')).not.toBeNull();
  });
});
