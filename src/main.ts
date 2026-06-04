import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Register UI5 Web Components Assets
import '@ui5/webcomponents/dist/Assets.js';
import '@ui5/webcomponents-fiori/dist/Assets.js';

// Import all SAP Horizon theme variants to register them with UI5 Web Components
import '@ui5/webcomponents-theming/dist/css/themes/sap_horizon/parameters-bundle.css';
import '@ui5/webcomponents-theming/dist/css/themes/sap_horizon_dark/parameters-bundle.css';
import '@ui5/webcomponents-theming/dist/css/themes/sap_horizon_hcb/parameters-bundle.css';
import '@ui5/webcomponents-theming/dist/css/themes/sap_horizon_hcw/parameters-bundle.css';

// Suppress harmless ResizeObserver errors
const resizeObserverLoopErrRe = /^ResizeObserver loop completed with undelivered notifications\./;
const originalErrorHandler = window.onerror;
window.onerror = (event, source, lineno, colno, error) => {
  if (event && typeof event === 'string' && resizeObserverLoopErrRe.test(event)) {
    return true; // Suppress this specific error
  }
  if (originalErrorHandler) {
    return originalErrorHandler(event, source, lineno, colno, error);
  }
  return false;
};

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
