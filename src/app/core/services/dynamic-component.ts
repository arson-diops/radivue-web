import {
  Injectable,
  ViewContainerRef,
  ComponentRef,
  Type,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DynamicComponentService {
  async loadComponent<T>(
    container: ViewContainerRef,
    componentImport: () => Promise<Record<string, Type<T>>>,
    componentName: string,
    inputs?: Record<string, unknown>
  ): Promise<ComponentRef<T>> {
    // Clear the container
    container.clear();

    // Dynamically import the component
    const componentModule = await componentImport();
    const componentType = componentModule[componentName];

    // Create the component
    const componentRef = container.createComponent(componentType);

    // Set inputs if provided
    if (inputs) {
      Object.keys(inputs).forEach((key) => {
        componentRef.setInput(key, inputs[key]);
      });
    }

    return componentRef;
  }
}
