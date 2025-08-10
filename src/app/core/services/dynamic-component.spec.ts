import { TestBed } from '@angular/core/testing';
import { ViewContainerRef, ComponentRef } from '@angular/core';
import { DynamicComponentService } from './dynamic-component';

describe('DynamicComponentService', () => {
  let service: DynamicComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicComponentService],
    });
    service = TestBed.inject(DynamicComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load a component dynamically', async () => {
    // Mock ViewContainerRef
    const mockComponentInstance = {};
    const mockComponentRef = {
      setInput: jasmine.createSpy('setInput'),
      instance: mockComponentInstance,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as unknown as ComponentRef<any>;

    const mockContainer: Partial<ViewContainerRef> = {
      clear: jasmine.createSpy('clear'),
      createComponent: jasmine
        .createSpy('createComponent')
        .and.returnValue(mockComponentRef),
    };

    // Mock dynamic import
    class DummyComponent {}
    const mockImport = async () => ({ DummyComponent });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await service.loadComponent(
      mockContainer as ViewContainerRef,
      mockImport,
      'DummyComponent',
      { foo: 'bar' }
    );

    expect(mockContainer.clear).toHaveBeenCalled();
    expect(mockContainer.createComponent).toHaveBeenCalledWith(DummyComponent);
    expect(mockComponentRef.setInput).toHaveBeenCalledWith('foo', 'bar');
  });
});
